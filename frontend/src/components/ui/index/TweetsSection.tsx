import { CardTweet } from "../../global/CardTweet";
import { useEffect } from "react";
import { useTweetStore } from "../../../store/tweetStore";

export const TweetsSection = () => {
  const { tweets, fetchTweets } = useTweetStore();

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  return (
    <>
      <section>
        {tweets.map((tweet) => (
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
