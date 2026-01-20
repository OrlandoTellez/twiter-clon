import type { UpdateUser } from "../../../types/user";
import { updateProfile } from "../../../api/user";
import { useUserStore } from "../../../store/userStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../common/Input.tsx";
import {
  updateUserSchema,
  type UptadteUserData,
} from "../../../validations/userValidation.ts";
import styles from "./FormUpdateUser.module.css";

export const FormUpdateUser = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (open: boolean) => void;
}) => {
  const { setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateUserSchema),
    mode: "onBlur",
  });

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

      setUser({
        name: updateUser.name,
        image_profile: updateUser.image_profile || "",
        image_banner: updateUser.image_banner || "",
      });
      setIsModalOpen(false);

      console.log(updateUser);
    } catch (error) {
      console.log("Login error: ", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContent}>
        <h3>Edit profile</h3>
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

        <div className={styles.buttons}>
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};
