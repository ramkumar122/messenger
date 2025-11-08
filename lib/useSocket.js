import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_API_URL);
    return () => {
      socket.current.disconnect();
    };
  }, []);

  return socket;
};