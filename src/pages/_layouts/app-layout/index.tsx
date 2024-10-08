import { Link, Outlet } from "react-router-dom";
import {
  AppContainer,
  CloseButton,
  Header,
  Overlay,
  Content,
  ProfileImage,
  LogoutButton,
} from "./styles";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { useUserContext } from "../../../contexts/user";
import DefaultAvatar from "../../../assets/profile.png";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export function AppLayout() {
  const { logout, user, updateAvatar } = useUserContext();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const profileImage = user?.avatarUrl ?? DefaultAvatar;
  let selectedFileUrl: string | null = null;
  if (file) {
    selectedFileUrl = URL.createObjectURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    if (!file) {
      return;
    }
    try {
      await updateAvatar(file);
      toast.success("Imagem de perfil alterada com sucesso!");
      setFile(null);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    try {
      if (!/image\/(png|jpg|jpeg)/.test(file.type)) {
        throw new Error(
          "O aquivo deve ser uma imagem de um dos tipos (png, jpg, jpeg)"
        );
      }
      setFile(file);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <AppContainer>
      <Header>
        <Link to="/">BookTrack</Link>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <div>
              <span>{user?.name}</span>
              <ProfileImage src={profileImage} alt="Avatar" />
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Overlay />
            <Dialog.Content asChild>
              <Content>
                <Dialog.Title>Perfil</Dialog.Title>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="avatar-input">
                    <ProfileImage
                      src={selectedFileUrl ?? profileImage}
                      alt="Avatar"
                    />
                  </label>
                  <input
                    id="avatar-input"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <input
                    type="text"
                    placeholder={user?.name}
                    required
                    disabled
                  />
                  <button type="submit" disabled={isLoading || file === null}>
                    {isLoading ? "Alterando..." : "Alterar"}
                  </button>
                </form>
                <LogoutButton onClick={() => logout()}>Sair</LogoutButton>
                <CloseButton onClick={() => setFile(null)}>
                  <X size={24} />
                </CloseButton>
              </Content>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Header>
      <Outlet />
    </AppContainer>
  );
}
