import React, { useEffect, useState } from "react";
import styles from "./Custom.module.css";
import { FaAngleDoubleRight } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
interface Props {
  DataList: any[];
  PushedList: any[];
  onPush: (ids: string[]) => void;
  onPop: (ids: string[]) => void;
  onDelete: (ids: string[]) => void;
  onView: (id: string) => void;
  Name?: string;
  Text1?: string;
  Text2?: string;
}
const CustomCompoenent = ({
  Name,
  DataList,
  PushedList,
  onPush,
  onDelete,
  onPop,
  onView,
  Text1,
  Text2,
}: Props) => {
  const [selected, setSelectedComponent] = useState<string[]>([]);
  const [selected2, setSelected2Component] = useState<string[]>([]);

  const Actions = {
    toggleSelected: (index: string) => {
      if (selected.includes(index))
        setSelectedComponent(selected.filter((e) => e !== index));
      else setSelectedComponent([...selected, index]);
    },
    toggleSelected2: (index: string) => {
      if (selected2.includes(index))
        setSelected2Component(selected2.filter((e) => e !== index));
      else setSelected2Component([...selected2, index]);
    },
  };
  const SelectedCss: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  };
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <h2>{Text1 || ""}</h2>
        <hr style={{ width: "100%" }} />
        <div className={styles.fieldsContainer}>
          {DataList.map((e, k) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                // paddingInline: "20px",
                alignItems: "center",
                ...(selected.includes(e._id)
                  ? SelectedCss
                  : { backgroundColor: "#6497B1" }),
              }}
              key={k}
            >
              <div
                className={styles.singleItem}
                onClick={() => Actions.toggleSelected(e._id)}
              >
                {Name} - {k + 1}
              </div>
              <FaEye className={styles.eyeIcon} onClick={() => onView(e._id)} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.second}>
        <div onClick={() => onPush(selected)}>
          <FaAngleDoubleRight size={25} />
        </div>
        <div onClick={() => onDelete(selected)}>
          <MdOutlineDelete color="red" size={25} />
        </div>
        <div>
          <FaAngleDoubleLeft size={25} />
        </div>
      </div>
      <div className={styles.third}>
        <h2>{Text2 || ""}</h2>
        <hr style={{ width: "100%" }} />
        <div className={styles.fieldsContainer}>
          {PushedList.map((e, k) => (
            <div
              key={k}
              className={styles.singleItem}
              style={
                selected2.includes(e._id)
                  ? SelectedCss
                  : { backgroundColor: "#6497B1" }
              }
              onClick={() => Actions.toggleSelected2(e._id)}
            >
              {Name} - {k + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomCompoenent;
