import { RegisterForm } from "../../components/auth/ResgisterForm";
import { SideLogo } from "../../components/auth/SideLogo";
import styles from "./Register.module.css";

const Register = () => {
  return (
    <>
      <section className={styles.container}>
        <SideLogo />
        <RegisterForm />
      </section>
    </>
  );
};

export default Register;
