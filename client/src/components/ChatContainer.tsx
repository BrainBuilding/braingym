import React, { useEffect, useState, useRef, useMemo } from "react";
import socketIOClient from "socket.io-client";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { fireDB } from "configs/firebaseConfig";
import { UserAuth } from "context/AuthContext";
import { TChatData } from "types";
import { ChatBoxReciever, ChatBoxSender } from "./ChatBox";
import { InputText } from "./InputText";

export default function ChatContainer() {
  const PORT = 5001;
  let socketio = socketIOClient(`http://localhost:${PORT}`);
  const [chats, setChats] = useState<TChatData[]>([]);
  const { user } = UserAuth();
  const chatsRef = useMemo(() => collection(fireDB, "Messages"), []);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    socketio.on("chat", (senderChats) => {
      setChats(senderChats);
    });
  });

  useEffect(() => {
    const q = query(chatsRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (querySnapshot) => {
      const fireChats: TChatData[] = [];
      querySnapshot.forEach((doc) => {
        fireChats.push(doc.data() as TChatData);
      });
      setChats([...fireChats]);
    });
    return () => {
      unsub();
    };
  }, [chatsRef]);

  function addToFirrebase(message: string) {
    const newChat = {
      avatar: user?.picture,
      createdAt: serverTimestamp(),
      user: user?.first_name,
      message,
    };

    const chatRef = doc(chatsRef);
    setDoc(chatRef, newChat)
      .then(() => console.log("Chat added succesfully"))
      .catch(console.error);
  }

  function sendChatToSocket(chat: TChatData[]) {
    console.log("chat[log]::", chat);

    socketio.emit("chat", chat);
  }

  const addMessage = (message: string) => {
    if (user) {
      const newChat: TChatData = {
        message,
        user: user?.first_name as string,
        avatar: user?.picture as string,
      };

      addToFirrebase(message);
      setChats([...chats, newChat]);
      sendChatToSocket([...chats, newChat]);
    }
  };

  const ChatsList = () => {
    return (
      <div style={{ height: "75vh", overflow: "scroll", overflowX: "hidden" }}>
        {chats.map((chat, index) => {
          if (chat.user === user?.first_name)
            return (
              <ChatBoxSender
                key={index}
                message={chat.message}
                avatar={chat.avatar}
                user={chat.user}
              />
            );
          return (
            <ChatBoxReciever
              key={index}
              message={chat.message}
              avatar={chat.avatar}
              user={chat.user}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    );
  };

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h4>
            <>Username: {user?.first_name}</>
          </h4>
        </div>
        <ChatsList />

        <InputText addMessage={addMessage} />
      </div>

      <div className="developed-by">Developed by Narek & Hayk</div>
    </div>
  );
}
