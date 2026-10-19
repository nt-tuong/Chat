import { io } from "socket.io-client";

export const socket = io("http://localhost:3001", {
  autoConnect: false, // tự kiểm soát lúc nào kết nối
});