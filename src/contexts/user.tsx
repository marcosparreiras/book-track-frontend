import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  updateUserAvatar,
  type User,
} from "../api/userResource";

interface UserContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateAvatar: (file: File) => Promise<void>;
}

const UserContext = createContext({} as UserContextProps);

export function UserContextProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    const { token } = await loginUser({ email, password });
    await fecthUserByToken(token);
  }

  async function logout() {
    localStorage.setItem("@booktrack:token", "");
    setUser(null);
  }

  async function updateAvatar(file: File) {
    if (!user) {
      throw new Error("Não autorizado!");
    }
    updateUserAvatar({ avatar: file }, user.token);
    setUser((prev) => ({
      ...(prev as User),
      avatarUrl: URL.createObjectURL(file),
    }));
    fecthUserByToken(user?.token as string);
  }

  async function fecthUserByToken(token: string) {
    const user = await getCurrentUser({ token });
    setUser(user);
    localStorage.setItem("@booktrack:token", token);
  }

  useEffect(() => {
    const localToken = localStorage.getItem("@booktrack:token");
    if (localToken) {
      fecthUserByToken(localToken);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, updateAvatar }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
