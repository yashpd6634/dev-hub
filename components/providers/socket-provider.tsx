"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const socketInstance = ClientIO(
      `${process.env.NEXT_PUBLIC_NEST_APP_URL}/${process.env.NEXT_PUBLIC_NEST_APP_SOCKET_NAMESPACE}`,
      {
        transports: ["websocket", "polling"],
        auth: {
          token: session?.backend_token,
        },
        
      },
    );
    console.log(socketInstance);

    socketInstance.on("connect", () => {
      console.log(
        `Connected with socket ID: ${socketInstance.id}. UserID: will join room`
      );
      setIsConnected(true);
    });

    socketInstance.on("connect_error", (err: any) =>
      console.error("Connection Error:", err)
    );

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
