import type { BookWithComments } from "../../api/bookResource";
import { RateStars } from "../rate-stars";
import { CommentDiv, CommentHeader } from "./styles";
import DefaultAvatarImage from "../../assets/profile.png";
import { useUserContext } from "../../contexts/user";

type CommentProps = {
  comment: BookWithComments["comments"][0];
  handleDeleteComment: (commentId: string) => Promise<void>;
};

export function Comment(props: CommentProps) {
  const { user } = useUserContext();
  const { comment, handleDeleteComment } = props;

  return (
    <CommentDiv key={comment.id}>
      <img src={comment.userAvatar ?? DefaultAvatarImage} />
      <div>
        <CommentHeader>
          <span>{comment.userName}</span>
          <RateStars rate={comment.rate} />
        </CommentHeader>
        <p>{comment.content}</p>
      </div>
      {comment?.userId === user?.id && (
        <button onClick={() => handleDeleteComment(comment.id)}>Deletar</button>
      )}
    </CommentDiv>
  );
}
