import { Tendencies } from "../ui/AppSideBarRight/Tendencies";
import { InputSearch } from "../common/InputSearch";
import styles from "./AppSideBarRight.module.css";

export const AppSideBarRight = () => {
  return (
    <div className={styles.container}>
      <InputSearch />
      <Tendencies />
    </div>
  );
};
