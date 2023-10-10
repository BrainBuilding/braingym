import React, { useState } from "react";
import Send from "@mui/icons-material/Send";
import { Button } from "./Button";

const styles = {
  button: {
    width: "10%",
    height: 50,
    fontWeight: "bold",
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "#34b7f1",
    borderWidth: 0,
    color: "#fff",
  },
  textarea: {
    width: "60%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0,
    padding: 10,
    fontSize: 18,
  },
  textContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
};

type Props = {
  addMessage: (message: string) => void;
};

export const InputText: React.FC<Props> = ({ addMessage }) => {
  const [message, setMessage] = useState("");

  function addAMessage() {
    addMessage(message);
    setMessage("");
  }

  return (
    <div style={styles.textContainer}>
      <textarea
        style={styles.textarea}
        rows={6}
        placeholder="Write something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <Button onClick={() => addAMessage()}>
        <Send />
      </Button>
    </div>
  );
};
