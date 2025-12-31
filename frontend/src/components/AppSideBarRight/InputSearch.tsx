import styles from "./InputSearch.module.css";

export const InputSearch = () => {
  return (
    <>
      <div className={styles.container}>
        <input className={styles.input} type="text" placeholder="Search" />
      </div>
    </>
  );
};
