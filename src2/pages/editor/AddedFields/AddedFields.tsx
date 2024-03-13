import styles from "./Addedfields.module.css";
import Card from "../../../compoenents/CardCompoenent";
import { TFields } from "../../../types/FormObject";

interface Props {
  ListOfFields: TFields[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}
const AddedFields = ({ ListOfFields, onDelete, onEdit }: Props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Added Fields</h2>
      <hr />
      {ListOfFields.length > 0
        ? ListOfFields.map((e, k) => (
            <Card
              key={k}
              fieldType={e.fieldType as string}
              id={e.fieldType as string}
              name={e.fieldName as string}
              onDelete={() => {
                onDelete(k);
              }}
              onEdit={() => {
                onEdit(k);
              }}
            />
          ))
        : null}
    </div>
  );
};

export default AddedFields;
