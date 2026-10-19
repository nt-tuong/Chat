import { useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { fmtTime } from "./utils";
import Login from "./components/Login";
import "./App.css";

// Components
import ChatPanel from "./components/ChatPanel";
import Avatar from "./components/Avatar";

const login = (name) => new Promise((resolve) => socket.emit("login", name, resolve));

/* ---------------- App ---------------- */
export default function App() {
  const [me, setMe] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [rooms, setRooms] = useState([]);
  const [msgs, setMsgs] = useState({}); // { roomId: [message] }
  const [active, setActive] = useState(null);
  const [unread, setUnread] = useState({});
  const [online, setOnline] = useState([]);
  const [typing, setTyping] = useState({}); // { roomId: [username] }
  const [search, setSearch] = useState("");
  // Ref để handler socket luôn đọc được giá trị mới nhất
  const activeRef = useRef(null);
  const meRef = useRef(null);

  useEffect(() => {
    const onMessage = (m) => {
      setMsgs((p) => ({ ...p, [m.room]: [...(p[m.room] || []), m] }));
      setTyping((t) => ({ ...t, [m.room]: (t[m.room] || []).filter((u) => u !== m.author) }));
      if (m.room !== activeRef.current && m.author !== meRef.current) {
        setUnread((u) => ({ ...u, [m.room]: (u[m.room] || 0) + 1 }));
      }
    };

    const onReacted = ({ room, messageId, reactions }) =>
      setMsgs((p) => ({
        ...p,
        [room]: (p[room] || []).map((m) => (m.id === messageId ? { ...m, reactions } : m)),
      }));

    const onTyping = ({ room, user, isTyping }) =>
      setTyping((t) => {
        const others = (t[room] || []).filter((u) => u !== user);
        return { ...t, [room]: isTyping ? [...others, user] : others };
      });

    // Tự đăng nhập lại khi mất kết nối rồi nối lại (vd: restart server)
    const onReconnect = async () => {
      if (!meRef.current) return;
      const res = await login(meRef.current);
      if (res.ok) setMsgs(res.history);
    };

    socket.on("receive_message", onMessage);
    socket.on("message_reacted", onReacted);
    socket.on("typing", onTyping);
    socket.on("online_users", setOnline);
    socket.on("connect", onReconnect);

    return () => {
      socket.off("receive_message", onMessage);
      socket.off("message_reacted", onReacted);
      socket.off("typing", onTyping);
      socket.off("online_users", setOnline);
      socket.off("connect", onReconnect);
    };
  }, []);

  const selectRoom = (id) => {
    activeRef.current = id;
    setActive(id);
    setUnread((u) => ({ ...u, [id]: 0 }));
  };

  const handleLogin = async (name) => {
    setLoginError("");
    socket.connect();
    const res = await login(name.trim());
    if (!res.ok) {
      setLoginError(res.error);
      socket.disconnect();
      return;
    }
    meRef.current = name.trim();
    setMe(name.trim());
    setRooms(res.rooms);
    setMsgs(res.history);
    selectRoom(res.rooms[0].id);
  };

  const handleReact = (room, messageId, emoji) => socket.emit("react", { room, messageId, emoji });

  if (!me) return <Login onSubmit={handleLogin} error={loginError} />;

  const room = rooms.find((r) => r.id === active);
  const filtered = rooms.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="app">
      <nav className="rail">
        <Avatar name={me} size={48} />
        <div className="rail-btn on" title="Tin nhắn">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
          </svg>
        </div>
      </nav>

      <aside className="list">
        <div className="list-top">
          <input
            placeholder="Tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="list-scroll">
          {filtered.map((r) => {
            const last = (msgs[r.id] || []).at(-1);
            return (
              <button
                key={r.id}
                className={`item ${r.id === active ? "on" : ""}`}
                onClick={() => selectRoom(r.id)}
              >
                <Avatar name={r.name} size={48} square />
                <div className="item-body">
                  <div className="item-name">{r.name}</div>
                  <div className="item-last">
                    {last ? `${last.author === me ? "Bạn" : last.author}: ${last.text}` : "Chưa có tin nhắn"}
                  </div>
                </div>
                <div className="item-meta">
                  {last && <span>{fmtTime(last.time)}</span>}
                  {unread[r.id] > 0 && <em>{unread[r.id] > 9 ? "9+" : unread[r.id]}</em>}
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {room && (
        <ChatPanel
          key={room.id}
          room={room}
          me={me}
          messages={msgs[room.id] || []}
          online={online}
          typingUsers={typing[room.id] || []}
          onReact={handleReact}
        />
      )}
    </div>
  );
}