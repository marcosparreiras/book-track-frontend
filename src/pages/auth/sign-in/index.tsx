import { Link, useLocation } from "react-router-dom";
import { AuthFormContainer } from "../../_layouts/auth-layout/styles";
import { ArrowRight } from "phosphor-react";
import { useEffect, useState } from "react";

export function SignIn() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get("email");
    const passwordParam = searchParams.get("password");
    if (emailParam && passwordParam) {
      setEmail(emailParam);
      setPassword(passwordParam);
    }
  }, [location]);

  return (
    <AuthFormContainer>
      <Link to="/signup">
        <span>Cadastrar</span>
        <ArrowRight className="icon" />
      </Link>
      <form>
        <label>
          <span>Email</span>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </AuthFormContainer>
  );
}
