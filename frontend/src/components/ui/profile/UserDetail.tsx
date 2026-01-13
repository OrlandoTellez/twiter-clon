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
import styled from "styled-components";

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

  const Container = styled.div`
    width: 100%;
    background-image: url(${user?.image_banner});
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

      if (data.image_banner !== undefined) {
        updateData.image_banner = data.image_banner;
      }

      if (data.bio !== undefined && data.bio.trim() !== "") {
        updateData.bio = data.bio;
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
      <Container>
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
      </Container>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Editar Perfil</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                Name:
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
                Profile image:
                <Input
                  label=""
                  name="image_profile"
                  type="file"
                  placeholder="Image profile"
                  register={register}
                  error={errors.image_profile?.message}
                />
              </label>
              <label>
                Banner image:
                <Input
                  label=""
                  name="image_banner"
                  type="file"
                  placeholder="Image banner"
                  register={register}
                  error={errors.image_banner?.message}
                />
              </label>
              <label>
                Edit bio:
                <Input
                  label=""
                  name="bio"
                  type="text"
                  placeholder="Bio"
                  register={register}
                  error={errors.bio?.message}
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
