import styled from "styled-components";

export const SignInContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
`;

export const ImageCover = styled.img`
  flex-grow: 1;
  height: 100%;
  object-fit: cover;

  @media (max-width: 1500px) {
    display: none;
  }
`;

export const AuthFormContainer = styled.div`
  padding: 4rem;

  a {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    justify-content: right;
    text-decoration: none;

    span {
      font-weight: 400;
      color: ${(props) => props.theme["gray-100"]};
      transition: 500ms;
    }

    .icon {
      color: ${(props) => props.theme["gray-100"]};
    }

    &:hover {
      .icon {
        color: ${(props) => props.theme["green-300"]};
      }
      span:hover {
        color: ${(props) => props.theme.white};
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    width: 26rem;
  }

  label {
    width: 100%;
  }

  span {
    display: block;
    font-weight: bold;
    color: ${(props) => props.theme.white};
  }

  input {
    width: 100%;
    height: 2rem;
    border: none;
    background: none;
    border-bottom: 1px solid ${(props) => props.theme["gray-100"]};
    color: ${(props) => props.theme["gray-300"]};
    transition: 500ms;
  }

  input:focus {
    border-bottom: 1px solid ${(props) => props.theme["green-300"]};
    color: ${(props) => props.theme.white};
    font-size: 1rem;
  }

  button {
    margin-top: 2rem;
    background: none;
    cursor: pointer;
    color: ${(props) => props.theme["gray-100"]};
    border: 1px solid ${(props) => props.theme["gray-100"]};
    font-weight: bold;
    height: 4rem;
    transition: 500ms;
  }

  button:hover {
    color: ${(props) => props.theme["green-300"]};
    border: 1px solid ${(props) => props.theme["green-300"]};
  }

  button:focus {
    border: 1px solid ${(props) => props.theme["green-300"]};
    font-size: 1.1rem;
  }

  @media (max-width: 1500px) {
    background-color: ${(props) => props.theme["gray-700"]};
    box-shadow: 2px 2px 2px ${(props) => props.theme["green-300"]};
  }

  @media (max-width: 768px) {
    padding: 2rem;

    form {
      width: 20rem;
      padding: 1rem;
    }
  }

  @media (max-width: 425px) {
    form {
      width: 14rem;
      padding: 1rem;
    }
  }
`;
