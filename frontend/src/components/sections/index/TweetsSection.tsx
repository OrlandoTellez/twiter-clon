import { CardTweet } from "../../global/CardTweet";
import { useTweetStore } from "../../../store/tweetStore";
import { useEffect } from "react";
import { useUserStore } from "../../../store/userStore";

export const TweetsSection = () => {
  const { tweets, fetchTweets } = useTweetStore();
  const { user_id } = useUserStore();

  useEffect(() => {
    fetchTweets(); // Cargar los tweets iniciales
  }, [fetchTweets]); //
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
            image={tweet.image}
            creation_date={tweet.created_at}
            likes_count={tweet.likes_count}
            is_liked_by_user={tweet.is_liked_by_user}
            currentUserId={user_id}
            tweetUserId={tweet.user.id}
          />
        ))}
      </section>
    </>
  );
};
