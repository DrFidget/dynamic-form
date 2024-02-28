import ListFields from "./typebased/list/ListFields";
import NumberFields from "./typebased/number/NumberFields";
import TableFields from "./typebased/table/TableFields";
export const MapTypeToCompoenet = {
  number: NumberFields,
  list: ListFields,
  radioList: ListFields,
  table: TableFields,
};
