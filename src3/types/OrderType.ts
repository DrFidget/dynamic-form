export interface TOrder {
  stage?: string;
  data: {
    stage: string;
    data: any[];
  }[];
  _id?: string;
  timeStamp: string;
  processing?: any;
  "pending approval": any;
}
