import {
  BookContentContainer,
  BookEditContainer,
  BookImageContainer,
  ButtonContainer,
} from "./styles";
import DefaultBookImg from "../../../assets/default-book.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../../contexts/user";
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import api from "../../../api";

export function BookEdit() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/signin");
    }
  }, [navigate, user]);

  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBook(bookId as string)
      .then((data) => {
        setBook(data);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.massage);
        }
      });
  }, []);

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const token = user?.token;
      if (book && token) {
        await updateBook(book, token);
        toast.success("Livro editado com sucesso!");
        navigate(`/book/${book.id}`);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.massage);
      }
    }
  }

  if (book == null) {
    return <h1>Carregando...</h1>;
  }

  return (
    <BookEditContainer>
      <form onSubmit={handleEdit}>
        <BookImageContainer>
          <img
            src={book.imageUrl ?? DefaultBookImg}
            alt=""
            onClick={() =>
              toast.info("Não é possível atualiazar a imagem de um livro")
            }
          />
          <input type="file" disabled />
        </BookImageContainer>
        <BookContentContainer>
          <h1>Editar livro</h1>
          <input
            type="text"
            placeholder="título"
            value={book.title}
            onChange={(e) =>
              setBook((prev) => ({
                ...(prev as Book),
                title: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="autor"
            value={book.author}
            onChange={(e) =>
              setBook((prev) => ({
                ...(prev as Book),
                author: e.target.value,
              }))
            }
          />
          <label>
            <span>Data de publicação</span>
            <input
              type="date"
              value={book.publishedAt}
              onChange={(e) =>
                setBook((prev) => ({
                  ...(prev as Book),
                  publishedAt: e.target.value,
                }))
              }
            />
          </label>
          <textarea
            placeholder="descrição"
            value={book.description}
            onChange={(e) =>
              setBook((prev) => ({
                ...(prev as Book),
                description: e.target.value,
              }))
            }
          />
          <ButtonContainer>
            <Link to={`/book/${book.id}`}>Cancelar</Link>
            <button type="submit">Editar</button>
          </ButtonContainer>
        </BookContentContainer>
      </form>
    </BookEditContainer>
  );
}

type Book = {
  id: string;
  imageUrl: string | null;
  author: string;
  title: string;
  publishedAt: string;
  description: string;
};

async function fetchBook(bookId: string): Promise<Book> {
  const apiResponse = await api.get(`/book/${bookId}`);
  const data = apiResponse.data.book;
  return {
    author: data.author,
    description: data.description,
    id: data.id,
    imageUrl: data.imageUrl,
    publishedAt: new Date(data.publishedAt).toISOString().split("T")[0],
    title: data.title,
  };
}

async function updateBook(book: Book, token: string): Promise<void> {
  const requestBody = {
    author: book.author,
    title: book.title,
    description: book.description,
    publishedAt: book.publishedAt,
  };
  await api.put(`/book/${book.id}`, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
