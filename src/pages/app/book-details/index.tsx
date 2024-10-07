import { Calendar, IdentificationBadge } from "phosphor-react";
import {
  BookDetailsContainer,
  CommentContainer,
  Comment,
  InfoItem,
  BookContainer,
  CommentHeader,
} from "./styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RateStars } from "../../../components/rate-stars";
import { useUserContext } from "../../../contexts/user";
import React, { useEffect, useState } from "react";
import api from "../../../api";
import DefaultBookImage from "../../../assets/default-book.png";
import DefaultAvatarImage from "../../../assets/profile.png";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export function BookDetails() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/signin");
    }
  }, [navigate, user]);

  const params = useParams();
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [rate, setRate] = useState<number>(1);
  const [content, setContnet] = useState<string>("");

  useEffect(() => {
    const { bookId } = params;
    fetchBookData(bookId as string).then((data) => {
      setBookData(data);
    });
  });

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    const { bookId } = params;
    try {
      await api.post(
        `/book/${bookId}/comment`,
        {
          content,
          rate,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const bookData = await fetchBookData(bookId as string);
      setBookData(bookData);
      setContnet("");
      setRate(1);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  }

  async function handleDeleteComment(commentId: string) {
    const { bookId } = params;
    if (!confirm("Confirme para deletar")) {
      return;
    }
    try {
      await api.delete(`/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const bookData = await fetchBookData(bookId as string);
      setBookData(bookData);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  }

  if (!bookData) {
    return <h1>Carregando...</h1>;
  }

  return (
    <BookDetailsContainer>
      <img src={bookData.imageUrl ?? DefaultBookImage} alt="" />
      <div>
        <Link to={`/book/${bookData.id}/edit`}>Editar</Link>
        <BookContainer>
          <h1>{bookData.title}</h1>
          <InfoItem>
            <IdentificationBadge size={18} />
            <span>{bookData.author}</span>
          </InfoItem>
          <InfoItem>
            <Calendar size={18} />
            <span>{new Date(bookData.publishedAt).getFullYear()}</span>
          </InfoItem>
          <p>{bookData.description}</p>
        </BookContainer>
        <CommentContainer>
          <form onSubmit={handleComment}>
            <div>
              <RateStars rate={rate} setRate={setRate} />
              <textarea
                placeholder="Deixe o seu comentário"
                required
                value={content}
                onChange={(e) => setContnet(e.target.value)}
              />
            </div>
            <button type="submit">Enviar</button>
          </form>
          {bookData.comments.length > 0 &&
            bookData.comments.map((comment) => (
              <Comment key={comment.id}>
                <img src={comment.userAvatar ?? DefaultAvatarImage} />
                <div>
                  <CommentHeader>
                    <span>{comment.userName}</span>
                    <RateStars rate={comment.rate} />
                  </CommentHeader>
                  <p>{comment.content}</p>
                </div>
                {comment?.userId === user?.id && (
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    Deletar
                  </button>
                )}
              </Comment>
            ))}
        </CommentContainer>
      </div>
    </BookDetailsContainer>
  );
}

type BookData = {
  id: string;
  title: string;
  author: string;
  description: string;
  publishedAt: string;
  imageUrl: string | null;
  comments: {
    id: string;
    content: string;
    rate: number;
    userName: string;
    userAvatar: string | null;
    userId: string | null;
  }[];
};

async function fetchBookData(id: string): Promise<BookData> {
  const apiResponse = await api.get(`/book/${id}`);
  const data = apiResponse.data;
  return data.book;
}
