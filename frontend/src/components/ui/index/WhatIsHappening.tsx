import styles from "./WhatIsHappening.module.css";
import { useTweetStore } from "../../../store/tweetStore";
import { useState } from "react";

export const WhatIsHappening = () => {
  const [content, setContent] = useState("");
  const { createTweet, loading } = useTweetStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await createTweet({ content });
    setContent("");
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="¿What is happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className={styles.button}>
            <button type="submit" disabled={loading}>
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
