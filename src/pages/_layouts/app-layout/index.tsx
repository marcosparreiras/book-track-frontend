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

export function AppLayout() {
  return (
    <AppContainer>
      <Header>
        <Link to="/">BookTrack</Link>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <div>
              <span>John Doe</span>
              <ProfileImage
                src="https://github.com/marcosparreiras.png"
                alt="Avatar"
              />
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Overlay />
            <Dialog.Content asChild>
              <Content>
                <Dialog.Title>Perfil</Dialog.Title>
                <form>
                  <label htmlFor="avatar-input">
                    <ProfileImage
                      src="http://github.com/marcosparreiras.png"
                      alt="Avatar"
                    />
                  </label>
                  <input id="avatar-input" type="file" />
                  <input type="text" placeholder="John Doe" required disabled />
                  <button type="submit">Alterar</button>
                </form>
                <LogoutButton>Sair</LogoutButton>
                <CloseButton>
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
