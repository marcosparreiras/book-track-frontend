import {
  BookContentContainer,
  BookCreateContainer,
  BookImageContainer,
} from "./styles";
import DefaultBookImg from "../../../assets/default-book.png";
import { useUserContext } from "../../../contexts/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/use-auth";
import { createBook } from "../../../api/bookResource";

export function BookCreate() {
  useAuth("admin");
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [publishedAt, setPublishedAt] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  let selectedFileUrl: string | null = null;
  if (imageFile) {
    selectedFileUrl = URL.createObjectURL(imageFile);
  }

  async function handleCreation(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (imageFile === null) {
        toast.info("Não é permitido a criação de livros sem imagem de capa");
        return;
      }
      const bookId = await createBook(
        {
          author,
          description,
          publishedAt,
          title,
        },
        imageFile,
        user?.token as string
      );
      toast.success("Livro adicionado com sucesso!");
      navigate(`/book/${bookId}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return toast.error(error.message);
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
      setImageFile(file);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <BookCreateContainer>
      <form onSubmit={handleCreation}>
        <BookImageContainer>
          <img src={selectedFileUrl ?? DefaultBookImg} alt="" />
          <input type="file" onChange={handleFileChange} />
        </BookImageContainer>
        <BookContentContainer>
          <h1>Adicionar novo livro</h1>
          <input
            required
            type="text"
            placeholder="título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            required
            type="text"
            placeholder="autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label>
            <span>Data de publicação</span>
            <input
              required
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
            />
          </label>
          <textarea
            placeholder="descrição"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Adicionando..." : "Adicionar"}
          </button>
        </BookContentContainer>
      </form>
    </BookCreateContainer>
  );
}
