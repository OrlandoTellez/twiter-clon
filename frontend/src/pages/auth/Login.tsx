import { LoginForm } from "../../components/auth/login/LoginForm";
import { SideLogo } from "../../components/auth/login/SideLogo";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <>
      <section className={styles.container}>
        <SideLogo />
        <LoginForm />
      </section>
    </>
  );
};

export default Login;
