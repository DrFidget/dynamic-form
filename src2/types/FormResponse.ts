interface TFormResponesDataValues {
  id: string;
  fieldName: string;
  fieldType: string;
  value: string;
}
interface TFormResponsesObj {
  _id?: string;
  timeStamp: string;
  singleResponse: TFormResponesDataValues[];
}
interface TFormRespones {
  FormId: string;
  Rsponses: TFormRespones[];
}
