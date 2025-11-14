import { io } from "socket.io-client";

let socket = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "https://gnanalytica-backend.wittywave-d8ad2c0e.eastus2.azurecontainerapps.io", {
      auth: {
        token: typeof window !== "undefined" ? localStorage.getItem("token") : null
      }
    });
  }
  return socket;
};

export const getSocket = () => socket;
