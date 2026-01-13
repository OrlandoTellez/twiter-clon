import styles from "./UserDetail.module.css";
import search from "../../../assets/navigation/search.svg";
import arrowLeft from "../../../assets/left-arrow.svg";
import { useEffect, useState } from "react";
import type { UpdateUser, User } from "../../../types/user";
import { getMyProfile, updateProfile } from "../../../api/user";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../common/Input.tsx";
import {
  updateUserSchema,
  type UptadteUserData,
} from "../../../validations/userValidation.ts";

export const UserDetail = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateUserSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    getMyProfile()
      .then(setUser)
      .catch(() => {});
  }, []);

  const onSubmit = async (data: UptadteUserData) => {
    try {
      const updateData: Partial<UpdateUser> = {};

      if (data.name !== undefined && data.name.trim() !== "") {
        updateData.name = data.name;
      }

      if (data.image_profile !== undefined) {
        updateData.image_profile = data.image_profile;
      }

      const updateUser = await updateProfile(updateData);

      setUser(updateUser);
      setIsModalOpen(false);

      console.log(updateUser);
    } catch (error) {
      console.log("Login error: ", error);
    }
  };

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
          <img src={user?.image_profile} alt="user image" />
          <button
            className={styles.button}
            onClick={() => {
              setIsModalOpen(true);
              reset({ name: user?.name });
            }}
          >
            Editar perfil
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Editar Perfil</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                Nombre:
                <Input
                  label=""
                  name="name"
                  type="text"
                  placeholder="Name"
                  register={register}
                  error={errors.name?.message}
                />
              </label>
              <label>
                Imagen de perfil:
                <Input
                  label=""
                  name="image_profile"
                  type="file"
                  placeholder="Image profile"
                  register={register}
                  error={errors.image_profile?.message}
                />
              </label>
              <button type="submit">Guardar</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
