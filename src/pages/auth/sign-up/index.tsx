import { Link } from "react-router-dom";
import { AuthFormContainer } from "../../_layouts/auth-layout/styles";
import { ArrowRight } from "phosphor-react";

export function SignUp() {
  return (
    <AuthFormContainer>
      <Link to="/">
        <span>Entrar</span>
        <ArrowRight className="icon" />
      </Link>

      <form>
        <label>
          <span>Nome</span>
          <input type="text" placeholder="John Doe" />
        </label>
        <label>
          <span>Email</span>
          <input type="email" placeholder="johndoe@gmail.com" />
        </label>
        <label>
          <span>Senha</span>
          <input type="password" placeholder="********" />
        </label>
        <label>
          <span>Confirmar senha</span>
          <input type="password" placeholder="********" />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </AuthFormContainer>
  );
}
