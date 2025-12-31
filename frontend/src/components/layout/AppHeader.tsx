import { Link } from "react-router-dom";
import styles from "./AppHeader.module.css";
import twiterLogo from "../../assets/twiterLogo.svg";
import home from "../../assets/navigation/home.svg";
import notification from "../../assets/navigation/notification.svg";
import search from "../../assets/navigation/search.svg";
import user from "../../assets/navigation/user.svg";

export const AppHeader = () => {
  return (
    <>
      <div className={styles.header}>
        <Link to={"/"} className={styles.link}>
          <img src={twiterLogo} alt="twitter logo" /> <span>Clone</span>
        </Link>
        <Link to={"/"} className={styles.link}>
          <img src={home} alt="home icon" /> <span>Inicio</span>
        </Link>
        <Link to={"/explore"} className={styles.link}>
          <img src={search} alt="explore icon" /> <span>Explore</span>
        </Link>
        <Link to={"/notifications"} className={styles.link}>
          <img src={notification} alt="notification icon" />{" "}
          <span>Notifications</span>
        </Link>
        <Link to={"/profile"} className={styles.link}>
          <img src={user} alt="user icon" /> <span>Profile</span>
        </Link>
      </div>
    </>
  );
};
