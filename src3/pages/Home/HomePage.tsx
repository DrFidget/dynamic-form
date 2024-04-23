import React from "react";
import styles from "./Home.module.css";
import Button from "../../../src2/compoenents/Button";
import printer from "../../assets/images/printer.png";
import Modal from "../../../src2/compoenents/Modal";
import LoadMultipleForms from "../../../src2/pages/MultipleFormsSubmit/LoadMultipleForms/LoadMultipleForms";
import { TFormType } from "../../../src2/types/FormObject";
import { OrderApis } from "../../service/api/Orders/OrderApis";
import { TOrder } from "../../types/OrderType";
import swal from "sweetalert";
const HomePage = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div style={{ height: "100%" }}>
      <div className={styles.navbar}>
        <div className={styles.logo}>3d-Printing</div>
        <div className={styles.itemsList}>
          <Button onClick={() => {}} color="#9400E0" text="About" />
          <Button onClick={() => {}} color="#9400E0" text="Services" />
          <Button onClick={() => {}} color="#9400E0" text="Products" />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.bodycontent}>
          <h1 className={styles.heading}>Start Your 3D Printing Journey.</h1>
          <p>
            Embark on affordable 3D printing with us! Our service offers
            cost-effective solutions for hobbyists, small businesses, and
            entrepreneurs. Start bringing your ideas to life today!
          </p>
          <div>
            <Button
              text="Place Order!"
              onClick={() => {
                setIsOpen(true);
              }}
              color="purple"
              styles={{ borderRadius: "20px", paddingInline: "40px" }}
            />
          </div>
        </div>
        <div>
          <img className={styles.img} src={printer} alt="" width="400px" />
        </div>
      </div>

      <Modal
        headerText="Place Order"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <LoadMultipleForms
          ListOfForms={abc}
          onSubmitForms={async (data: any[]) => {
            console.log(data);
            let orderData: TOrder = {
              data: data,
            };
            let sent = await OrderApis.createOrder(orderData);
            if (!sent) {
              swal("error occured");
            }
            setIsOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default HomePage;
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
