import { Link } from "react-router-dom";
import { AuthFormContainer } from "../../_layouts/auth-layout/styles";
import { ArrowRight } from "phosphor-react";

export function SignIn() {
  return (
    <AuthFormContainer>
      <Link to="/signup">
        <span>Cadastrar</span>
        <ArrowRight className="icon" />
      </Link>
      <form>
        <label>
          <span>Email</span>
          <input type="email" placeholder="johndoe@gmail.com" />
        </label>
        <label>
          <span>Senha</span>
          <input type="password" placeholder="********" />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </AuthFormContainer>
  );
}
