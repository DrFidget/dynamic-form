import React from "react";
import styles from "./ToolBar.module.css";
import Button from "../Button";

interface Props {
  isRedyToSubmit: boolean;
  onCreate: () => void;
  onCancel: () => void;
}

const ToolBar = ({ isRedyToSubmit, onCreate, onCancel }: Props) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.text}>ToolBar</div>

      <div className={styles.Actions}>
        <Button
          color="green"
          onClick={onCreate}
          text="Create"
          disabled={isRedyToSubmit}
        />
        <Button
          color="#E70127"
          onClick={onCancel}
          text="Cancel"
          disabled={isRedyToSubmit}
        />
      </div>
    </div>
  );
};

export default ToolBar;
