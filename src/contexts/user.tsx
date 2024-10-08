import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

type User = {
  name: string;
  email: string;
  avatarUrl?: string | null;
  token: string;
  id: string;
  isAdmin: boolean;
};

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
    const sessionResponse = await api.post("/session", { email, password });
    const token = sessionResponse.data.token;
    if (!token) {
      throw new Error("Algo deu errado, tente novamente mais tarde");
    }
    await fecthUserByToken(token);
  }

  async function logout() {
    localStorage.setItem("@booktrack:token", "");
    setUser(null);
  }

  async function updateAvatar(file: File) {
    const formData = new FormData();
    formData.append("avatar", file);
    await api.patch("/me/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.token}`,
      },
    });
    setUser((prev) => {
      if (prev === null) {
        return prev;
      }
      return { ...prev, avatarUrl: URL.createObjectURL(file) };
    });
    fecthUserByToken(user?.token as string);
  }

  async function fecthUserByToken(token: string) {
    const getUserResponse = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      name,
      email: userEmail,
      avatarUrl,
      id,
      isAdmin,
    } = getUserResponse.data;
    if (
      typeof name !== "string" ||
      typeof userEmail !== "string" ||
      typeof id !== "string" ||
      typeof isAdmin !== "boolean"
    ) {
      throw new Error("Algo deu errado, tente novamente mais tarde");
    }
    setUser({ name, email: userEmail, avatarUrl, token, id, isAdmin });
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
