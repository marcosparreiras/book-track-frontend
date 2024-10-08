import { Link, useNavigate } from "react-router-dom";
import { AuthFormContainer } from "../../_layouts/auth-layout/styles";
import { ArrowRight } from "phosphor-react";
import React, { useEffect, useState } from "react";
import api from "../../../api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useUserContext } from "../../../contexts/user";

export function SignUp() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (password !== passwordConfirmation) {
        throw new Error(
          "As senhas não coincidem. Verifique e tente novamente."
        );
      }
      const requestBody = {
        name,
        email,
        password,
      };
      await api.post("/users", requestBody);
      toast.success("Cadastro realizado com sucesso!");
      navigate(`/signin?email=${email}&password=${password}`);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }
      if (error instanceof Error) {
        return toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthFormContainer>
      <Link to="/signin">
        <span>Entrar</span>
        <ArrowRight className="icon" />
      </Link>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome</span>
          <input
            required
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            required
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            required
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Confirmar senha</span>
          <input
            required
            type="password"
            placeholder="********"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </AuthFormContainer>
  );
}
