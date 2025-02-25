import styles from "./Addedfields.module.css";
import { TFields } from "../../../types/FormObject";
import Button from "../../../compoenents/Button";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { FiMove, FiCopy, FiTrash2, FiPlus } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";

interface Props {
  ListOfFields: TFields[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onSelect: (index: number) => void;
  onReorder: (sourceIndex: number, destinationIndex: number) => void;
  onDuplicate: (index: number) => void;
  onBulkDelete?: (indices: number[]) => void;
  onBulkDuplicate?: (indices: number[]) => void;
  onBulkMove?: (indices: number[], targetIndex: number) => void;
  ST?: React.CSSProperties;
}

const AddedFields = ({
  ListOfFields,
  onDelete,
  onEdit,
  ST,
  onSelect,
  onReorder,
  onDuplicate,
  onBulkDelete,
  onBulkDuplicate,
  onBulkMove,
}: Props) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Handle drag end
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  // Handle checkbox selection
  const handleSelect = (index: number, isChecked: boolean) => {
    setSelectedIndices((prev) => {
      if (isChecked) {
        return [...prev, index];
      } else {
        return prev.filter((i) => i !== index);
      }
    });
  };

  // Toggle bulk actions visibility
  useEffect(() => {
    setShowBulkActions(selectedIndices.length > 0);
  }, [selectedIndices]);

  // Handle keyboard shortcuts and copy/paste
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndices.length === 0) return;

      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        onBulkDuplicate?.(selectedIndices);
      } else if (e.key === "Delete") {
        e.preventDefault();
        onBulkDelete?.(selectedIndices);
        setSelectedIndices([]);
      }
    },
    [selectedIndices, onBulkDelete, onBulkDuplicate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.h2}>Added Fields</h2>
        {showBulkActions && (
          <div className={styles.bulkActions}>
            <Button
              onClick={() => {
                onBulkDelete?.(selectedIndices);
                setSelectedIndices([]);
              }}
              text={<FiTrash2 />}
              color="#E70127"
              title="Delete selected fields"
            />
            <Button
              onClick={() => onBulkDuplicate?.(selectedIndices)}
              text={
                <>
                  <FiCopy />
                  <FiPlus />
                </>
              }
              color="#28a745"
              title="Duplicate selected fields"
            />
            <select
              className={styles.moveSelect}
              onChange={(e) => {
                const targetIndex = parseInt(e.target.value);
                if (!isNaN(targetIndex)) {
                  onBulkMove?.(selectedIndices, targetIndex);
                  setSelectedIndices([]);
                }
              }}
            >
              <option value="">Move to...</option>
              {ListOfFields.map((_, index) => (
                <option key={index} value={index}>
                  Position {index + 1}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <hr />
      <div className={`${styles.tableContainer}`} style={{ ...ST }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="fields">
            {(provided: DroppableProvided) => (
              <table
                className={`${styles.customTable}`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <thead>
                  <tr>
                    <th className={`${styles.customTableth}`}></th>
                    <th className={`${styles.customTableth}`}>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          const indices = e.target.checked
                            ? ListOfFields.map((_, i) => i)
                            : [];
                          setSelectedIndices(indices);
                        }}
                        checked={
                          selectedIndices.length === ListOfFields.length &&
                          ListOfFields.length > 0
                        }
                      />
                    </th>
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
                    ? ListOfFields.map((field, index) => (
                        <Draggable
                          key={`${field.id}-${index}`}
                          draggableId={`${field.id}-${index}`}
                          index={index}
                        >
                          {(
                            provided: DraggableProvided,
                            snapshot: DraggableStateSnapshot
                          ) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`${styles.customTabletr} ${
                                snapshot.isDragging ? styles.dragging : ""
                              } ${
                                selectedIndices.includes(index)
                                  ? styles.selected
                                  : ""
                              }`}
                              onClick={() => onSelect(index)}
                              data-index={index}
                            >
                              <td
                                className={`${styles.customTabletd} ${styles.dragHandle}`}
                                {...provided.dragHandleProps}
                              >
                                <FiMove />
                              </td>
                              <td className={`${styles.customTabletd}`}>
                                <input
                                  type="checkbox"
                                  checked={selectedIndices.includes(index)}
                                  onChange={(e) =>
                                    handleSelect(index, e.target.checked)
                                  }
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </td>
                              <td className={`${styles.customTabletd}`}>
                                {index + 1}
                              </td>
                              <td className={`${styles.customTabletd}`}>
                                {field.id}
                              </td>
                              <td className={`${styles.customTabletd}`}>
                                {field.fieldName}
                              </td>
                              <td className={`${styles.customTabletd}`}>
                                {field.fieldType}
                              </td>
                              <td className={`${styles.customTabletd}`}>
                                {field.visible ? "Yes" : "No"}
                              </td>
                              <td className={`${styles.customTabletd}`}>
                                {field.enable ? "Yes" : "No"}
                              </td>
                              <td className={`${styles.customTabletd}`}>
                                {field.binding ? "Yes" : "No"}
                              </td>
                              <td className={`${styles.customTabletdA}`}>
                                <Button
                                  onClick={() => onDelete(index)}
                                  text="Del"
                                  color="#E70127"
                                />
                                <Button
                                  onClick={() => onEdit(index)}
                                  text="Edit"
                                  color="#007BFF"
                                />
                                <Button
                                  onClick={() => onDuplicate(index)}
                                  text={<FiCopy />}
                                  color="#28a745"
                                  title="Copy field (Ctrl+C)"
                                />
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))
                    : null}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default AddedFields;
