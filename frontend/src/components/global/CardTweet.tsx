import { useTweetStore } from "../../store/tweetStore";
import hearth from "../../assets/global/hearth.svg";
import hearthFilled from "../../assets/global/hearth-fill.svg";
import messageCircle from "../../assets/global/message-circle.svg";
import trash from "../../assets/global/trash.svg";
import dots from "../../assets/global/dots.svg";
import styles from "./CardTweet.module.css";
import { formatRelativeTime } from "../../utils/formatRelativeTime";
import { useState } from "react";

interface CardTweetProps {
  id: number;
  img: string;
  name: string;
  username: string;
  content: string;
  image?: string;
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
  image,
  creation_date,
  likes_count,
  is_liked_by_user,
  currentUserId,
  tweetUserId,
}: CardTweetProps) => {
  const { toggleLike, deleteTweet } = useTweetStore();

  const [activeTab, setActiveTab] = useState(true);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete the tweet?")) {
      await deleteTweet(id);
    }
  };

  const isMyTweet = currentUserId === tweetUserId;

  return (
    <>
      <article className={styles.container}>
        <div className={styles.userImage}>
          <img src={img} alt="user profile image" />
        </div>
        <div className={styles.infoContent}>
          <div className={styles.info}>
            <div className={styles.text}>
              <div className={styles.textUser}>
                <p>{name}</p>
               <span>@{username}</span>
              </div>
              <span>{formatRelativeTime(creation_date)}</span>
            </div>
            <button
              onClick={() => setActiveTab(!activeTab)}
              className={`${styles.buttonDots} ${activeTab ? styles.dotsActive : styles.dotsNotActive}`}
            >
              <img src={dots} alt="dots icon" />
            </button>
            {activeTab ? null : (
              <>
                <div className={styles.options}>
                  {isMyTweet && (
                    <button onClick={handleDelete}>
                      <img src={trash} alt="trash icon" />
                      Eliminar tweet
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
          <div>
            <p>{content}</p>
            <div className={styles.imageContainer}>
              {image && (
                <>
                  <img
                    src={image}
                    alt="tweet image"
                    className={styles.image}
                  />
                </>
              )}
            </div>
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
