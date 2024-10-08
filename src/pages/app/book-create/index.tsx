import {
  BookContentContainer,
  BookCreateContainer,
  BookImageContainer,
} from "./styles";
import DefaultBookImg from "../../../assets/default-book.png";
import { useUserContext } from "../../../contexts/user";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export function BookCreate() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/signin");
    }
  }, [navigate, user]);

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
      const token = user?.token;
      if (!token) {
        return;
      }
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
        token
      );
      toast.success("Livro adicionado com sucesso!");
      navigate(`/book/${bookId}`);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.massage);
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

type BookInfo = {
  author: string;
  title: string;
  publishedAt: string;
  description: string;
};

async function createBook(
  book: BookInfo,
  bookImage: File,
  token: string
): Promise<string> {
  const formData = new FormData();
  formData.append("author", book.author);
  formData.append("title", book.title);
  formData.append("publishedAt", book.publishedAt);
  formData.append("description", book.description);
  formData.append("bookImage", bookImage);
  const apiResponse = await api.post(`/book`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return apiResponse.data.bookId;
}
