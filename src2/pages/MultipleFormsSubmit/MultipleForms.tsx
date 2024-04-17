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
    Name: "Contact Information",
    Schema: [
      {
        id: "ContactName",
        fieldName: "Name",
        fieldType: "text",
        visible: true,
        enable: true,
        required: true,
      },
      {
        id: "ContactEmail",
        fieldName: "Email",
        fieldType: "text",
        visible: true,
        enable: true,
        required: true,
      },
      {
        id: "ContactPhone",
        fieldName: "Phone Number",
        fieldType: "text",
      },
      {
        id: "ContactAddress",
        fieldName: "Address",
        fieldType: "text",
        visible: true,
        enable: true,
        required: true,
      },
    ],
  },
  {
    Name: "Product Details",
    Schema: [
      {
        id: "ordertype",
        fieldName: "type",
        fieldType: "list",
        options: ["prototype", "gadget", "acessory", "figurine", "other"],
        visible: true,
        enable: true,
        required: true,
        binding: {
          property: false,
          targetProperty: "visible",
          target: "customdetails",
          mapping: [
            {
              options: ["other"],
              mapTo: "true",
              target: "customdetails",
            },
            {
              options: ["prototype", "gadget", "acessory", "figurine"],
              target: "customdetails",
              mapTo: "false",
            },
          ],
        },
      },
      {
        id: "customdetails",
        fieldName: "Add Description",
        fieldType: "text",
        visible: false,
        enable: true,
        required: false,
      },
      {
        id: "materialtype",
        fieldName: "Material Type",
        fieldType: "radioList",
        options: ["ABS", "PLA", "PETG"],
        visible: true,
        enable: true,
        required: true,
      },
      {
        id: "dimensionX",
        fieldName: "Width in cm",
        fieldType: "number",
        numberDecimal: true,
        required: true,
        visible: true,
        enable: true,
      },
      {
        id: "dimensionY",
        fieldName: "Height in cm",
        fieldType: "number",
        numberDecimal: true,
        visible: true,
        enable: true,
        required: true,
      },
      {
        id: "divider1",
        fieldName: "Divider",
        fieldType: "divider",
      },
      {
        id: "color",
        fieldName: "Color",
        fieldType: "list",
        options: ["red", "blue", "green", "black", "white", "custom"],
        binding: {
          property: false,
          targetProperty: "visible",
          target: "colorinput",
          mapping: [
            {
              options: ["red", "blue", "green", "black", "white"],
              mapTo: "false",
              target: "colorinput",
            },
            {
              target: "colorinput",
              options: ["custom"],
              mapTo: "true",
            },
          ],
        },
      },
      {
        id: "colorinput",
        fieldName: "Custom Color",
        fieldType: "text",
        required: false,
        visible: false,
        enable: true,
      },
      {
        id: "quantity",
        fieldName: "Quantity",
        fieldType: "number",
        numberMin: "1",
        numberMax: "10",
        visible: true,
        enable: true,
        required: true,
        default: "1",
      },
      {
        id: "density",
        fieldName: "Infill Density ( % )",
        fieldType: "number",
        numberMin: "5",
        numberMax: "80",
        numberDecimal: true,
        visible: true,
        enable: true,
        required: true,
        default: "20",
      },
    ],
  },
  {
    Name: "Upload Design",
    Schema: [
      {
        id: "3ddesign",
        fieldName: "Upload Design",
        fieldType: "image",
        visible: true,
        enable: true,
        required: true,
      },
      {
        id: "description",
        fieldName: "Description (optional)",
        fieldType: "text",
      },
      {
        id: "div1",
        fieldName: "divider",
        fieldType: "divider",
      },
      {
        id: "label",
        fieldName: "Additional Requirments",
        fieldType: "label",
      },
      {
        id: "div2",
        fieldName: "divider",
        fieldType: "divider",
      },
      {
        id: "date",
        fieldName: "Deadline Date (optional)",
        fieldType: "date",
      },
    ],
  },
];
