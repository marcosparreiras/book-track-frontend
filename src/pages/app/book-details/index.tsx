import { Calendar, IdentificationBadge } from "phosphor-react";
import {
  BookDetailsContainer,
  CommentContainer,
  InfoItem,
  BookContainer,
  AdminCommands,
} from "./styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RateStars } from "../../../components/rate-stars";
import { useUserContext } from "../../../contexts/user";
import React, { useEffect, useState } from "react";
import DefaultBookImage from "../../../assets/default-book.png";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/use-auth";
import {
  deleteBook,
  fetchBookWithComments,
  type BookWithComments,
} from "../../../api/bookResource";
import { createComment, deleteComment } from "../../../api/commentsResource";
import { Comment } from "../../../components/comment";

export function BookDetails() {
  useAuth("user");
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [bookData, setBookData] = useState<BookWithComments | null>(null);
  const [rate, setRate] = useState<number>(1);
  const [content, setContnet] = useState<string>("");

  useEffect(() => {
    fetchBookWithComments(bookId as string)
      .then((data) => {
        setBookData(data);
      })
      .catch((error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      });
  }, [bookId]);

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createComment(
        { content, rate },
        bookId as string,
        user?.token as string
      );
      const bookData = await fetchBookWithComments(bookId as string);
      toast.success("Comentário criado com sucesso!");
      setBookData(bookData);
      setContnet("");
      setRate(1);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  async function handleDeleteComment(commentId: string) {
    if (!confirm("Confirme para deletar")) {
      return;
    }
    try {
      await deleteComment(commentId, user?.token as string);
      const bookData = await fetchBookWithComments(bookId as string);
      toast.success("Comentário deletado com sucesso!");
      setBookData(bookData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  async function handleDeleteBook() {
    if (!confirm("Confirme para deletar!")) {
      return;
    }
    try {
      await deleteBook(bookId as string, user?.token as string);
      toast.success("Livro deletado com sucesso!");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
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
        {user?.isAdmin && (
          <AdminCommands>
            <Link to={`/book/${bookData.id}/edit`}>Editar</Link>
            <button onClick={handleDeleteBook}>Deletar</button>
          </AdminCommands>
        )}
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
              <Comment
                key={comment.id}
                comment={comment}
                handleDeleteComment={handleDeleteComment}
              />
            ))}
        </CommentContainer>
      </div>
    </BookDetailsContainer>
  );
}
