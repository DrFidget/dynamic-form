import React from "react";
import styles from "./ToolBar.module.css";
import Button from "../Button";

interface Props {
  isRedyToSubmit: boolean;
  onClick: () => void;
}

const ToolBar = ({ isRedyToSubmit, onClick }: Props) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.text}>ToolBar</div>

      <div className={styles.Actions}>
        <Button
          color="green"
          onClick={onClick}
          text="Done"
          disabled={isRedyToSubmit}
        />
      </div>
    </div>
  );
};

export default ToolBar;
