import { ImageCover, SignInContainer } from "./styles";
import BooksImage from "../../../assets/books.png";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <SignInContainer>
      <ImageCover src={BooksImage} alt="" />
      <Outlet />
    </SignInContainer>
  );
}
