import React, { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import { ChatBoxReciever, ChatBoxSender } from "./ChatBox";
import { InputText } from "./InputText";
import { UserLogin } from "./UserLogin";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import db from "./firebaseConfig/firebaseConfig.js";
import { TChatData } from "../types";

export default function ChatContainer() {
  const PORT = 5001;
  let socketio = socketIOClient(`http://localhost:${PORT}`);
  const [chats, setChats] = useState<TChatData[]>([]);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const avatar = localStorage.getItem("avatar") as string;
  const chatsRef = collection(db, "Messages");
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
      avatar,
      createdAt: serverTimestamp(),
      user,
      message,
    };

    const chatRef = doc(chatsRef);
    setDoc(chatRef, newChat)
      .then(() => console.log("Chat added succesfully"))
      .catch(console.log);
  }

  function sendChatToSocket(chat: TChatData[]) {
    console.log("chat[log]::", chat);

    socketio.emit("chat", chat);
  }

  const addMessage = (message: string) => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser && avatar) {
      const newChat: TChatData = {
        message,
        user: loggedInUser,
        avatar,
      };
      addToFirrebase(message);
      setChats([...chats, newChat]);
      sendChatToSocket([...chats, newChat]);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    setUser("");
  };

  const ChatsList = () => {
    return (
      <div style={{ height: "75vh", overflow: "scroll", overflowX: "hidden" }}>
        {chats.map((chat, index) => {
          if (chat.user === user)
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
      {user ? (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4>Username: {user}</h4>
            <p
              onClick={() => logout()}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Log Out
            </p>
          </div>
          <ChatsList />

          <InputText addMessage={addMessage} />
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
      <div className="developed-by">Developed by Narek & Hayk</div>
    </div>
  );
}
