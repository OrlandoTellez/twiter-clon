import { CardTweet } from "../../global/CardTweet";
import { useEffect, useState } from "react";
import { useTweetStore } from "../../../store/tweetStore";
import styles from "./MyTweetsSection.module.css";

export const MyTweetsSection = () => {
  const [activeTab, setActiveTab] = useState<"posts" | "likes">("posts");
  const { myTweets, likedTweets, fetchMyTweets, fetchLikedTweets } =
    useTweetStore();

  useEffect(() => {
    if (activeTab === "posts") {
      fetchMyTweets();
    } else {
      fetchLikedTweets();
    }
  }, [fetchMyTweets, fetchLikedTweets, activeTab]);

  return (
    <>
      <section>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <button
                onClick={() => setActiveTab("posts")}
                className={activeTab === "posts" ? styles.active : ""}
              >
                Posts
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("likes")}
                className={activeTab === "likes" ? styles.active : ""}
              >
                Likes
              </button>
            </li>
          </ul>
        </nav>
        {activeTab === "posts"
          ? myTweets.map((tweet) => (
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
            ))
          : likedTweets.map((tweet) => (
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
