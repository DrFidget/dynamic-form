export interface TValidation {
  type: string,//"w" | "e" | "s" | "c";
  rule: string;
  msg: string;
  color: string;
}

export interface TNumber {
  numberDecimal?: boolean;
  numberMin?: number;
  numberMax?: number;
  // EnableValidation?:boolean;
  validation?: {rules:TValidation[]};
}

interface List {
  options: string[] | number[];
  data: string[] | number[];
}



export interface IbaseProp{
    number:TNumber,
    list:List,
    radioList:List,
}


const abc={
  numberDecimal:true,
  numberMin:0,
  numberMax:10,
  validation:{
    type:"w",
    rule:"abc",
    msg:"abc",
    color:"red"
  }
}