import styles from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../common/Input.tsx";
import {
  registerSchema,
  type RegisterData,
} from "../../validations/loginValidations.ts";
import type { RegisterMethod } from "../../types/auth";
import { registerUser } from "../../api/auth.ts";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../../api/user";
import { useUserStore } from "../../store/userStore";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterMethod) => {
    try {
      await registerUser({
        name: data.name,
        last_name: data.last_name,
        age: data.age,
        email: data.email,
        username: data.username,
        password: data.password,
      });

      const profile = await getMyProfile();
      useUserStore.getState().setUser(profile);

      navigate("/");
    } catch (error) {
      console.log("Register error: ", error);
    }
  };

  return (
    <>
      <article className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h4>Register Form</h4>
          <div className={styles.inputs}>
            <Input
              label=""
              name="name"
              type="text"
              placeholder="Name"
              register={register}
              error={errors.name?.message}
            />

            <Input
              label=""
              name="last_name"
              type="text"
              placeholder="Last name"
              register={register}
              error={errors.last_name?.message}
            />

            <Input
              label=""
              name="age"
              type="number"
              placeholder="Age"
              //@ts-expect-error("ignorar este errorsito xd")
              register={(name) => register(name, { valueAsNumber: true })}
              error={errors.age?.message}
            />

            <Input
              label=""
              name="email"
              type="text"
              placeholder="Email"
              register={register}
              error={errors.email?.message}
            />

            <Input
              label=""
              name="username"
              type="text"
              placeholder="Username"
              register={register}
              error={errors.username?.message}
            />

            <Input
              label=""
              name="password"
              type="text"
              placeholder="Password"
              register={register}
              error={errors.password?.message}
            />
            <button>Submit</button>
          </div>
        </form>
        <div className={styles.notAccount}>
          <span>
            Do you already have an account?
            <Link to={"/auth/login"}>Login in</Link>
          </span>
        </div>
      </article>
    </>
  );
};
