import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const AppContainer = styled.div`
  height: 100vh;
`;

export const Header = styled.header`
  padding: 1rem;
  box-shadow: 2px 0 5px white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme["gray-700"]};

  a {
    text-decoration: none;
    color: ${(props) => props.theme["gray-100"]};
    font-weight: bold;
    font-size: 1.4rem;
    transition: 500ms;
  }

  a:hover {
    color: ${(props) => props.theme.white};
  }

  div {
    cursor: pointer;
    display: flex;
    gap: 1rem;
    align-items: center;
    transition: 500ms;
  }

  div:hover {
    span {
      color: ${(props) => props.theme.white};
    }

    img {
      border: 3px solid ${(props) => props.theme["green-300"]};
    }
  }
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${(props) => props.theme["green-300"]};
`;

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  max-width: 420px;
  width: 95vw;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme["gray-800"]};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  label {
    text-align: center;
    img {
      margin: auto;
      cursor: pointer;
      width: 150px;
      height: 150px;
    }
  }

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input[type="file"] {
      display: none;
    }

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme["gray-900"]};
      color: ${(props) => props.theme["gray-300"]};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme["gray-500"]};
      }
    }

    button[type="submit"] {
      height: 58px;
      border: 0;
      background: ${(props) => props.theme["green-500"]};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.5rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${(props) => props.theme["green-700"]};
        transition: background-color 0.2s;
      }
    }
  }
`;

export const LogoutButton = styled.button`
  background-color: ${(props) => props.theme["red-500"]};
  font-weight: 400;
  padding: 0.4rem 1rem;
  border: 0;
  color: ${(props) => props.theme.white};
  border-radius: 6px;
  display: block;
  margin-left: auto;
  margin-top: 1.5rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme["red-700"]};
    transition: background-color 0.2s;
  }
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme["gray-500"]};
`;
