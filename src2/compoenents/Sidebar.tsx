// components/Sidebar.tsx

import React from "react";
import styles from "./Sidebar.module.css"; // Import the CSS module

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <button className={styles.button}>Required</button>
      <button className={styles.button}>TypeBased</button>
      <button className={styles.button}>HTML</button>
      <button className={styles.button}>Optional</button>
    </div>
  );
};

export default Sidebar;
