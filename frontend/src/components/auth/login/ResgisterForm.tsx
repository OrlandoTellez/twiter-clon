import styles from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../common/Input.tsx";
import {
  registerSchema,
  type RegisterData,
} from "../../../validations/loginValidations.ts";
import type { RegisterMethod } from "../../../types/auth";
import { registerUser } from "../../../api/auth.ts";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterMethod) => {
    const register = await registerUser({
      name: data.name,
      last_name: data.last_name,
      age: data.age,
      email: data.email,
      username: data.username,
      password: data.password,
    });

    console.log(register);
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
        <div>
          <Link to={"/auth/login"}>Login Form</Link>
        </div>
      </article>
    </>
  );
};
