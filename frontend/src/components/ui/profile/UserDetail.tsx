import styles from "./UserDetail.module.css";
import search from "../../../assets/navigation/search.svg";
import arrowLeft from "../../../assets/left-arrow.svg";
import { useEffect, useState } from "react";
import type { User } from "../../../types/user";
import { getMyProfile, updateProfile } from "../../../api/user";

export const UserDetail = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formImage, setFormImage] = useState<File | null>(null);

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
           <button className={styles.button} onClick={() => setIsModalOpen(true)}>Editar perfil</button>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Editar Perfil</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                const updatedUser = await updateProfile(formName, formImage || undefined);
                setUser(updatedUser);
                setIsModalOpen(false);
              } catch (error) {
                console.error("Error updating profile:", error);
              }
            }}>
              <label>
                Nombre:
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                />
              </label>
              <label>
                Imagen de perfil:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormImage(e.target.files?.[0] || null)}
                />
              </label>
              <button type="submit">Guardar</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
