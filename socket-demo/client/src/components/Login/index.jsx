import React, { useState } from "react";
import "../../App.css";

/* ---------------- Màn hình đăng nhập ---------------- */
function Login({ onSubmit, error }) {
  const [name, setName] = useState("");

  return (
    <div className="login">
      <div className="login-card">
        <h1>Chat</h1>
        <p>Nhập tên để vào trò chuyện cùng mọi người</p>
        <input
          autoFocus
          maxLength={20}
          value={name}
          placeholder="Tên hiển thị"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit(name)}
        />
        {error && <div className="login-error">{error}</div>}
        <button disabled={!name.trim()} onClick={() => onSubmit(name)}>
          Vào chat
        </button>
      </div>
    </div>
  );
}

export default Login;