import styles from "./Addedfields.module.css";
import Card from "../../../compoenents/CardCompoenent";
import { TFields } from "../../../types/FormObject";
import Button from "../../../compoenents/Button";

interface Props {
  ListOfFields: TFields[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onSelect: (index: number) => void;
  ST?: React.CSSProperties;
}
const AddedFields = ({
  ListOfFields,
  onDelete,
  onEdit,
  ST,
  onSelect,
}: Props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Added Fields</h2>
      <hr />
      <div className={`${styles.tableContainer}`} style={{ ...ST }}>
        <table className={`${styles.customTable}`}>
          <thead>
            <tr>
              <th className={`${styles.customTableth}`}>#</th>
              <th className={`${styles.customTableth}`}>Id</th>
              <th className={`${styles.customTableth}`}>Name</th>
              <th className={`${styles.customTableth}`}>Type</th>
              <th className={`${styles.customTableth}`}>Visible</th>
              <th className={`${styles.customTableth}`}>Enable</th>
              <th className={`${styles.customTableth}`}>Binding</th>
              <th className={`${styles.customTableth}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ListOfFields.length > 0
              ? ListOfFields.map((e, k) => (
                  <tr
                    className={`${styles.customTabletr}`}
                    key={k}
                    onClick={() => onSelect(k)}
                  >
                    <td className={`${styles.customTabletd}`}>{k + 1}</td>
                    <td className={`${styles.customTabletd}`}>{e.id}</td>
                    <td className={`${styles.customTabletd}`}>{e.fieldName}</td>
                    <td className={`${styles.customTabletd}`}>{e.fieldType}</td>
                    <td className={`${styles.customTabletd}`}>
                      {e.visible ? "Yes" : "No"}
                    </td>
                    <td className={`${styles.customTabletd}`}>
                      {e.enable ? "Yes" : "No"}
                    </td>
                    <td className={`${styles.customTabletd}`}>
                      {e.binding ? "Yes" : "No"}
                    </td>
                    <td className={`${styles.customTabletdA}`}>
                      <Button
                        onClick={() => onDelete(k)}
                        text="Del"
                        color="#E70127"
                      />
                      <Button
                        onClick={() => onEdit(k)}
                        text="Edit"
                        color="#007BFF"
                      />
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddedFields;
