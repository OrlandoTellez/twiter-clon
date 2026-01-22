import styles from "./WhatIsHappening.module.css";
import photo from "../../../assets/global/photo.svg";
import { useTweetStore } from "../../../store/tweetStore";
import React, { useState, useRef } from "react";

export const WhatIsHappening = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { createTweetWithImage, loading, fetchTweets } = useTweetStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    await createTweetWithImage(content, image || undefined);
    setContent("");
    setImage(null);
    setImagePreview(null);
    await fetchTweets();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
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
          {imagePreview && (
            <>
              <img
                src={imagePreview}
                alt="preview image"
                style={{ maxWidth: "100px" }}
              />
            </>
          )}
          <div className={styles.buttons}>
            <div className={styles.options}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none", width: "100%" }}
              />
              <img
                src={photo}
                alt="photo icon"
                onClick={() => fileInputRef.current?.click()}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.postButton}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
