import styles from "./UserDetail.module.css";
import search from "../../../assets/navigation/search.svg";
import arrowLeft from "../../../assets/left-arrow.svg";
import { useEffect, useState } from "react";
import type { User } from "../../../types/user";
import { getMyProfile } from "../../../api/user";

export const UserDetail = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMyProfile()
      .then(setUser)
      .catch(() => {});
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <img src={arrowLeft} alt="icono arrow left" />
          <div>
            <h5>{user?.name}</h5>
            <span>13 posts</span>
          </div>
        </div>

        <img src={search} alt="icono search" />
      </div>
      <div className={styles.container}>
        <div className={styles.profile}>
          <img src="husky.png" alt="user image" />
          <button className={styles.button}>Editar perfil</button>
        </div>
      </div>
    </>
  );
};
