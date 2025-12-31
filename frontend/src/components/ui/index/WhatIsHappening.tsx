import styles from "./WhatIsHappening.module.css";

export const WhatIsHappening = () => {
  return (
    <>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          placeholder="¿What is happening?"
        />
        <div className={styles.button}>
          <button>Post</button>
        </div>
      </div>
    </>
  );
};
