import styles from "./UserDetail.module.css";

export const UserDetail = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.profile}>
          <img src="husky.png" alt="user image" />
          <button className={styles.button}>Editar perfil</button>
        </div>
      </div>
    </>
  );
};
