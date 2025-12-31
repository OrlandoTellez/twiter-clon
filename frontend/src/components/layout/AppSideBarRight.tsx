import { InputSearch } from "../AppSideBarRight/InputSearch";
import { Tendencies } from "../AppSideBarRight/Tendencies";
import styles from "./AppSideBarRight.module.css";

export const AppSideBarRight = () => {
  return (
    <div className={styles.container}>
      <InputSearch />
      <Tendencies />
    </div>
  );
};
