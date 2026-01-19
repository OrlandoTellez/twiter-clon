import { CardTweet } from "../../global/CardTweet";
import { useEffect } from "react";
import { useTweetStore } from "../../../store/tweetStore";
import styles from "./MyTweetsSection.module.css";

export const MyTweetsSection = () => {
  const { myTweets, fetchMyTweets } = useTweetStore();

  useEffect(() => {
    fetchMyTweets();
  }, [fetchMyTweets]);

  return (
    <>
      <section>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <a href="#">Posts</a>
            </li>
            <li>
              <a href="#">Likes</a>
            </li>
          </ul>
        </nav>
        {myTweets.map((tweet) => (
          <CardTweet
            key={tweet.id}
            id={tweet.id}
            img={tweet.user.profile_image || "https://unavatar.io/x/Rubiu5"}
            name={tweet.user.name}
            username={tweet.user.username}
            content={tweet.content}
            creation_date={tweet.created_at}
            likes_count={tweet.likes_count}
            is_liked_by_user={tweet.is_liked_by_user}
          />
        ))}
      </section>
    </>
  );
};

