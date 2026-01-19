import { useTweetStore } from "../../store/tweetStore";
import { useUserStore } from "../../store/userStore";
import hearth from "../../assets/global/hearth.svg";
import hearthFilled from "../../assets/global/hearth-fill.svg";
import messageCircle from "../../assets/global/message-circle.svg";
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
}: CardTweetProps) => {
  const { toggleLike } = useTweetStore();
  const { user_id } = useUserStore();

  console.log({ user_id, id });

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
          </div>
          <div>
            <p>{content}</p>
          </div>
          <div className={styles.buttons}>
            <button>
              <img src={messageCircle} alt="message circle icon" />
            </button>
            <button
              onClick={() => toggleLike({ user_id: user_id, tweet_id: id })}
              className={styles.hearthIcon}
            >
              {is_liked_by_user ? (
                <img src={hearthFilled} alt="hearth icon" />
              ) : (
                <img src={hearth} alt="hearth icon" />
              )}
              {likes_count}
            </button>
          </div>
        </div>
      </article>
    </>
  );
};
