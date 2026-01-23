import { useState, useEffect } from "react";
import { useTweetStore } from "../../store/tweetStore";
import messageCircle from "../../assets/global/message-circle.svg";
import styles from "./CommentsSection.module.css";
import { useUserStore } from "../../store/userStore";

interface CommentsSectionProps {
  tweetId: number;
  commentsCount: number;
}

export const CommentsSection = ({ tweetId, commentsCount }: CommentsSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { comments, fetchCommentsByTweet, createComment, deleteComment  } = useTweetStore();
  const { user_id } = useUserStore();

  useEffect(() => {
    if (isOpen) {
      fetchCommentsByTweet(tweetId);
    }
  }, [isOpen, tweetId, fetchCommentsByTweet]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      await createComment({
        content: newComment,
        tweet_id: tweetId
      });
      setNewComment("");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este comentario?")) {
      await deleteComment(commentId);
    }
  };

  return (
    <div className={styles.commentsSection}>
      <button
        className={styles.commentsButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={messageCircle} alt="comments" />
        <span>{commentsCount}</span>
      </button>

      {isOpen && (
        <div className={styles.commentsContainer}>
          <form onSubmit={handleSubmitComment} className={styles.commentForm}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
              className={styles.commentInput}
            />
            <button type="submit" className={styles.submitButton}>
              Comentar
            </button>
          </form>

          <div className={styles.commentsList}>
            {comments.map((comment) => (
              <div key={comment.id} className={styles.commentItem}>
                <div className={styles.commentHeader}>
                  <img
                    src={comment.user.profile_image || "https://unavatar.io/x/Rubiu5"}
                    alt={comment.user.name}
                    className={styles.commentAvatar}
                  />
                  <div className={styles.commentInfo}>
                    <span className={styles.commentName}>{comment.user.name}</span>
                    <span className={styles.commentUsername}>@{comment.user.username}</span>
                  </div>
                  {user_id === comment.user.id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className={styles.deleteButton}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
                <p className={styles.commentContent}>{comment.content}</p>
                <span className={styles.commentTime}>
                  {new Date(comment.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
