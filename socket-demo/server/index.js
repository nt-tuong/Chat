import express from "express";
import http from "http";
import cors from "cors";
import { randomUUID } from "crypto";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

app.get("/", (req, res) => res.send("Server đang chạy"));

// ---- Dữ liệu lưu trong RAM (thay bằng database khi làm thật) ----
const ROOMS = [
  { id: "general", name: "Cộng đồng chung" },
  { id: "dev", name: "Team Dev" },
  { id: "friends", name: "Hội bạn thân" },
];
const ALLOWED_REACTIONS = ["👍", "❤️", "😆", "😮", "😭", "😡"];
const MAX_HISTORY = 200;

const history = Object.fromEntries(ROOMS.map((r) => [r.id, []]));
const users = new Map(); // socket.id -> username

const onlineList = () => [...new Set(users.values())];

io.on("connection", (socket) => {
  // Đăng nhập: client gửi tên, server trả về danh sách phòng + lịch sử
  socket.on("login", (username, ack) => {
    const name = String(username || "").trim().slice(0, 20);
    if (!name) return ack?.({ ok: false, error: "Tên không được để trống" });
    if (onlineList().includes(name)) {
      return ack?.({ ok: false, error: "Tên này đang có người dùng" });
    }

    users.set(socket.id, name);
    ROOMS.forEach((r) => socket.join(r.id));

    ack?.({ ok: true, rooms: ROOMS, history });
    io.emit("online_users", onlineList());
  });

  socket.on("send_message", ({ room, text }) => {
    const author = users.get(socket.id);
    const content = String(text || "").trim().slice(0, 2000);
    if (!author || !history[room] || !content) return;

    const msg = {
      id: randomUUID(),
      room,
      author,
      text: content,
      time: Date.now(),
      reactions: {}, // { "👍": ["An", "Bình"], "❤️": [...] }
    };

    history[room].push(msg);
    if (history[room].length > MAX_HISTORY) history[room].shift();

    io.to(room).emit("receive_message", msg);
  });

  // Thả / đổi / bỏ reaction. Mỗi người chỉ có 1 reaction trên 1 tin nhắn.
  socket.on("react", ({ room, messageId, emoji }) => {
    const user = users.get(socket.id);
    if (!user || !ALLOWED_REACTIONS.includes(emoji)) return;

    const msg = history[room]?.find((m) => m.id === messageId);
    if (!msg) return;

    const hadSame = msg.reactions[emoji]?.includes(user);

    // Gỡ reaction cũ của người này
    for (const e of Object.keys(msg.reactions)) {
      msg.reactions[e] = msg.reactions[e].filter((u) => u !== user);
      if (msg.reactions[e].length === 0) delete msg.reactions[e];
    }

    // Bấm lại đúng emoji cũ = bỏ reaction, ngược lại = thả emoji mới
    if (!hadSame) (msg.reactions[emoji] ||= []).push(user);

    io.to(room).emit("message_reacted", {
      room,
      messageId,
      reactions: msg.reactions,
    });
  });

  socket.on("typing", ({ room, isTyping }) => {
    const user = users.get(socket.id);
    if (!user || !history[room]) return;
    socket.to(room).emit("typing", { room, user, isTyping: !!isTyping });
  });

  socket.on("disconnect", () => {
    if (users.delete(socket.id)) io.emit("online_users", onlineList());
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Server chạy ở cổng ${PORT}`));
