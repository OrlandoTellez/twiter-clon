import type React from "react";
import { AppHeader } from "./AppHeader";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className={styles.container}>
        {/*header*/}
        <AppHeader />

        {/*contenido de la aplicacion*/}
        <main className={styles.content}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
