"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RefreshToken from "@/components/refresh-token";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  decodeToken,
  generateSocketInstace,
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage,
} from "@/lib/utils";
import { RoleType } from "@/types/jwt.types";
import type { Socket } from "socket.io-client";
import ListenLogoutSocket from "@/components/listen-logout-socket";
import { create } from "zustand";

// Default
// staleTime: 0
// gc: 5 phút (5 * 1000* 60)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

type AppStoreType = {
  isAuth: boolean;
  role: RoleType | undefined;
  setRole: (role?: RoleType | undefined) => void;
  socket: Socket | undefined;
  setSocket: (socket?: Socket | undefined) => void;
  disconnectSocket: () => void;
};

export const useAppStore = create<AppStoreType>((set) => ({
  isAuth: false,
  role: undefined as RoleType | undefined,
  setRole: (role?: RoleType | undefined) => {
    set({ role, isAuth: Boolean(role) });
    if (!role) {
      removeTokensFromLocalStorage();
    }
  },
  socket: undefined as Socket | undefined,
  setSocket: (socket?: Socket | undefined) => set({ socket }),
  disconnectSocket: () =>
    set((state) => {
      state.socket?.disconnect();
      return { socket: undefined };
    }),
}));

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setRole = useAppStore((state) => state.setRole);
  const setSocket = useAppStore((state) => state.setSocket);
  // const [socket, setSocket] = useState<Socket | undefined>()
  // const [role, setRoleState] = useState<RoleType | undefined>()
  const count = useRef(0);

  useEffect(() => {
    if (count.current === 0) {
      const accessToken = getAccessTokenFromLocalStorage();
      if (accessToken) {
        const role = decodeToken(accessToken).role;
        setRole(role);
        setSocket(generateSocketInstace(accessToken));
      }
      count.current++;
    }
  }, [setRole, setSocket]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <RefreshToken />
      <ListenLogoutSocket />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
