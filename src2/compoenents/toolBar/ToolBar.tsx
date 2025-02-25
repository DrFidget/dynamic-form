import React from "react";
import styles from "./ToolBar.module.css";
import Button from "../Button";
import { FiRotateCcw, FiRotateCw, FiClipboard } from "react-icons/fi";

interface Props {
  isRedyToSubmit: boolean;
  onCreate: () => void;
  onCancel: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onPasteJSON: () => void;
  canUndo: boolean;
  canRedo: boolean;
}
const ToolBar: React.FC<Props> = ({
  isRedyToSubmit,
  onCreate,
  onCancel,
  onUndo,
  onRedo,
  onPasteJSON,
  canUndo,
  canRedo,
}) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.leftActions}>
        <Button
          color="#4a4a4a"
          onClick={onUndo}
          text={<FiRotateCcw />}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        />
        <Button
          color="#4a4a4a"
          onClick={onRedo}
          text={<FiRotateCw />}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
        />
        <Button
          color="#4a4a4a"
          onClick={onPasteJSON}
          text={<FiClipboard />}
          disabled={false}
          title="Paste JSON Field"
        />
      </div>

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
