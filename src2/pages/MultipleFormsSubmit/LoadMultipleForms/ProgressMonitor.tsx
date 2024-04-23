import React from "react";
import styles from "./ProgressMonitor.module.css";
import Button from "../../../compoenents/Button";

interface Props {
  length: number;
  current: number;
  changeIndex: (index: number) => void;
  visited: any;
}

const ProgressMonitor: React.FC<Props> = ({
  length,
  current,
  changeIndex,
  visited,
}) => {
  return (
    <div className={styles.outercontainer}>
      {" "}
      <div className={styles.container}>
        {Array.from({ length: length }, (_, index) => (
          <Button
            key={index}
            text=""
            // color="white"
            onClick={() => {
              changeIndex(index);
            }}
            disabled={!visited[index]}
            styles={{ opacity: index == current ? "100%" : "40%" }}
          ></Button>
        ))}
      </div>
    </div>
  );
};

export default ProgressMonitor;
