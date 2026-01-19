import styles from "./UserDetail.module.css";
import search from "../../../assets/navigation/search.svg";
import arrowLeft from "../../../assets/left-arrow.svg";
import { useEffect, useState } from "react";
import { getMyProfile } from "../../../api/user";
import { FormUpdateUser } from "./FormUpdateUser";
import styled from "styled-components";
import { useUserStore } from "../../../store/userStore";

export const UserDetail = () => {
  const { user_id, name, username, image_banner, image_profile, setUser } =
    useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Container = styled.div`
    width: 100%;
    background-image: url(${image_banner});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 100px 0px;

    && img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid var(--primary-color);
    }
  `;

  useEffect(() => {
    getMyProfile()
      .then(setUser)
      .catch(() => {});
  }, [setUser]);

  console.log(getMyProfile(), user_id);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <img src={arrowLeft} alt="icono arrow left" />
          <div>
            <h5>{name}</h5>
            <span>13 posts</span>
          </div>
        </div>

        <img src={search} alt="icono search" />
      </div>
      <Container>
        <div className={styles.profile}>
          <img src={image_profile} alt="user image" />
          <button
            className={styles.button}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Editar perfil
          </button>
        </div>
      </Container>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modali}>
            <FormUpdateUser setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      )}

      <section className={styles.infoSection}>
        <article>
          <div>
            <h3>{name}</h3>
            <span className={styles.username}>{username}</span>
          </div>
        </article>
      </section>
    </>
  );
};
