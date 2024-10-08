import { Link, useLocation } from "react-router-dom";
import { AuthFormContainer } from "../../_layouts/auth-layout/styles";
import { ArrowRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../../../contexts/user";
import { useAuth } from "../../../hooks/use-auth";

export function SignIn() {
  useAuth("not-user");
  const { login } = useUserContext();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get("email");
    const passwordParam = searchParams.get("password");
    if (emailParam && passwordParam) {
      setEmail(emailParam);
      setPassword(passwordParam);
    }
  }, [location]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthFormContainer>
      <Link to="/signup">
        <span>Cadastrar</span>
        <ArrowRight className="icon" />
      </Link>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </AuthFormContainer>
  );
}
