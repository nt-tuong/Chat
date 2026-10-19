import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import "../../App.css";

// Components
import Message from "../Message";
import Avatar from "../Avatar";

/* ---------------- Khung chat ---------------- */
const EMOJIS = ["😀", "😂", "😍", "🥰", "😎", "🤔", "😭", "😡", "👍", "🙏", "🎉", "🔥", "❤️", "💯", "👀", "🤝"];

function ChatPanel({ room, me, messages, online, typingUsers, onReact }) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const typingRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, typingUsers.length]);

  const stopTyping = () => {
    clearTimeout(timerRef.current);
    if (typingRef.current) {
      typingRef.current = false;
      socket.emit("typing", { room: room.id, isTyping: false });
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (!typingRef.current) {
      typingRef.current = true;
      socket.emit("typing", { room: room.id, isTyping: true });
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(stopTyping, 1500);
  };

  const send = () => {
    if (!text.trim()) return;
    socket.emit("send_message", { room: room.id, text });
    setText("");
    setShowEmoji(false);
    stopTyping();
    inputRef.current?.focus();
  };

  const addEmoji = (e) => {
    setText((t) => t + e);
    inputRef.current?.focus();
  };

  return (
    <section className="chat">
      <header className="chat-head">
        <Avatar name={room.name} size={44} square />
        <div>
          <div className="chat-title">{room.name}</div>
          <div className="chat-sub">
            {online.length} người đang online
          </div>
        </div>
      </header>

      <div className="messages">
        {messages.length === 0 && <div className="empty">Chưa có tin nhắn. Hãy gửi lời chào đầu tiên!</div>}
        {messages.map((m, i) => (
          <Message
            key={m.id}
            m={m}
            me={me}
            showHeader={i === 0 || messages[i - 1].author !== m.author}
            onReact={(id, emoji) => onReact(room.id, id, emoji)}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="typing">
        {typingUsers.length > 0 && (
          <>
            <span className="dots"><i /><i /><i /></span>
            {typingUsers.join(", ")} đang soạn tin...
          </>
        )}
      </div>

      <footer className="composer">
        {showEmoji && (
          <div className="emoji-pop">
            {EMOJIS.map((e) => (
              <button key={e} onClick={() => addEmoji(e)}>{e}</button>
            ))}
          </div>
        )}
        <button className="icon-btn" aria-label="Chọn emoji" onClick={() => setShowEmoji((v) => !v)}>
          😊
        </button>
        <input
          ref={inputRef}
          autoFocus
          value={text}
          placeholder={`Nhập tin nhắn tới ${room.name}`}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className="send" disabled={!text.trim()} onClick={send}>
          Gửi
        </button>
      </footer>
    </section>
  );
}

export default ChatPanel;