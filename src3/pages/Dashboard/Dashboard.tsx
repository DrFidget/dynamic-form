import React from "react";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidepanel}>
        <div className={styles.admin}>Admin</div>
        <div className={styles.navigation}>
          <li className={styles.navItem}>Dashboard</li>
          <li className={styles.navItem}>Queue</li>
          <li className={styles.navItem}>Processing</li>
          <li className={styles.navItem}>Printing</li>
          <li className={styles.navItem}>Redy To Deliver</li>
        </div>
      </div>
      <div className={styles.mainBody}></div>
    </div>
  );
};

export default Dashboard;
