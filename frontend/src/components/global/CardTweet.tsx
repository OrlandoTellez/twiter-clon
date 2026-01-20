import { useTweetStore } from "../../store/tweetStore";
import hearth from "../../assets/global/hearth.svg";
import hearthFilled from "../../assets/global/hearth-fill.svg";
import messageCircle from "../../assets/global/message-circle.svg";
import trash from "../../assets/global/trash.svg";
import styles from "./CardTweet.module.css";

interface CardTweetProps {
  id: number;
  img: string;
  name: string;
  username: string;
  content: string;
  creation_date: string;
  likes_count: number;
  is_liked_by_user: boolean;
  currentUserId?: number;
  tweetUserId?: number;
}

export const CardTweet = ({
  id,
  img,
  name,
  username,
  content,
  creation_date,
  likes_count,
  is_liked_by_user,
  currentUserId,
  tweetUserId
}: CardTweetProps) => {
  const { toggleLike, deleteTweet } = useTweetStore();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete the tweet?")) {
      await deleteTweet(id);
    }
  }

  const isMyTweet = currentUserId === tweetUserId;

  return (
    <>
      <article className={styles.container}>
        <div className={styles.userImage}>
          <img src={img} alt="user profile image" />
        </div>
        <div className={styles.infoContent}>
          <div className={styles.info}>
            <p>{name}</p>
            <span>{username}</span>
            <span>{creation_date}</span>
            {isMyTweet && (
              <button onClick={handleDelete}>
                <img src={trash} alt="trash icon" />
              </button>
            )}
          </div>
          <div>
            <p>{content}</p>
          </div>
          <div className={styles.buttons}>
            <button>
              <img src={messageCircle} alt="message circle icon" />
            </button>
            <button
              onClick={() => toggleLike({ tweet_id: id })}
              className={styles.hearthIcon}
            >
              {is_liked_by_user ? (
                <>
                  <img src={hearthFilled} alt="hearth icon" />
                  <span id={styles.filled}>{likes_count}</span>
                </>
              ) : (
                <>
                  <img src={hearth} alt="hearth icon" />
                  <span id={styles.notFilled}>{likes_count}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </article>
    </>
  );
};
