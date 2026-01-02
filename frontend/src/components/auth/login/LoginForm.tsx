import styles from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../common/Input.tsx";
import {
  loginSchema,
  type LoginData,
} from "../../../validations/loginValidations.ts";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });
  const onSubmit = (data: object) => console.log(data);
  console.log("error: ", errors);

  return (
    <>
      <article className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h4>Login Form</h4>
          <div className={styles.inputs}>
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
      </article>
    </>
  );
};
