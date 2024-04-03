import Modal from "../../compoenents/Modal";
import Carousel from "../../compoenents/Carousel";
import MainForm from "../../../src/compoenets/MainForm";
import React, { useState } from "react";
import swal from "sweetalert";
import LoadMultipleForms from "./LoadMultipleForms/LoadMultipleForms";
import { TFormType } from "../../types/FormObject";

const MultipleForms = () => {
  return <div>{<LoadMultipleForms ListOfForms={abc} />}</div>;
};

export default MultipleForms;

let abc: TFormType[] = [
  {
    Name: "form1",
    Schema: [
      {
        id: "date1",
        fieldName: "Date",
        fieldType: "date",
      },
      {
        id: "time",
        fieldName: "Time",
        fieldType: "time",
      },
      {
        id: "datetime",
        fieldName: "Date and Time",
        fieldType: "datetime",
      },
      {
        id: "UserMobileNo",
        fieldName: "Contact Number",
        fieldType: "text",
        default: "#VAR_UMOBILE#",
      },
      {
        id: "id_lat",
        fieldName: "Latitude",
        fieldType: "text",
        default: "#VAR_CLAT#",
      },
    ],
  },
  {
    Name: "form2",
    Schema: [
      {
        id: "date1",
        fieldName: "Date",
        fieldType: "date",
      },
      {
        id: "time",
        fieldName: "Time",
        fieldType: "time",
      },
      {
        id: "datetime",
        fieldName: "Date and Time",
        fieldType: "datetime",
      },
      {
        id: "UserMobileNo",
        fieldName: "Contact Number",
        fieldType: "text",
        default: "#VAR_UMOBILE#",
      },
      {
        id: "id_lat",
        fieldName: "Latitude",
        fieldType: "text",
        default: "#VAR_CLAT#",
      },
    ],
  },
  {
    Name: "form3",
    Schema: [
      {
        id: "date1",
        fieldName: "Date",
        fieldType: "date",
      },
      {
        id: "time",
        fieldName: "Time",
        fieldType: "time",
      },
      {
        id: "datetime",
        fieldName: "Date and Time",
        fieldType: "datetime",
      },
      {
        id: "UserMobileNo",
        fieldName: "Contact Number",
        fieldType: "text",
        default: "#VAR_UMOBILE#",
      },
      {
        id: "id_lat",
        fieldName: "Latitude",
        fieldType: "text",
        default: "#VAR_CLAT#",
      },
    ],
  },
  {
    Name: "form4",
    Schema: [
      {
        id: "date1",
        fieldName: "Date",
        fieldType: "date",
      },
      {
        id: "time",
        fieldName: "Time",
        fieldType: "time",
      },
      {
        id: "datetime",
        fieldName: "Date and Time",
        fieldType: "datetime",
      },
      {
        id: "UserMobileNo",
        fieldName: "Contact Number",
        fieldType: "text",
        default: "#VAR_UMOBILE#",
      },
      {
        id: "id_lat",
        fieldName: "Latitude",
        fieldType: "text",
        default: "#VAR_CLAT#",
      },
    ],
  },
];
