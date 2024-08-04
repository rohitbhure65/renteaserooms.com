import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  interface OnlineUser {
    userId: string;
    socketId: string;
  }

  let onlineUsers: OnlineUser[] = [];

  const addUser = (userId: string, socketId: string) => {
    const userExists = onlineUsers.find((user) => user.userId === userId);
    if (!userExists) {
      onlineUsers.push({ userId, socketId });
    }
  };

  const removeUser = (socketId: string) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId: string): OnlineUser | undefined => {
    return onlineUsers.find((user) => user.userId === userId);
  };

  io.on("connection", (socket) => {
    socket.on("newUser", (userId: string) => {
      addUser(userId, socket.id);
    });

    socket.on("sendMessage", ({ receiverId, data }: { receiverId: string; data: any }) => {
      const receiver = getUser(receiverId);
      if (receiver) {
        io.to(receiver.socketId).emit("getMessage", data);
      }
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });

  server.listen(4000, (err?: any) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:4000");
  });
});
