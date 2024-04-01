import React, { useState } from "react";
import Modal from "../../../compoenents/Modal";
import { TFormType } from "../../../types/FormObject";
import MainForm from "../../../../src/compoenets/MainForm";
import { FormResponseApis } from "../../../service/API/FormResponses/FormResponses";
import swal from "sweetalert";

interface Props {
  FormResponse: TFormResponsesObj;
  Form: TFormType;
  onclose: () => void;
}
const EditingPreviousResponse = ({ FormResponse, Form, onclose }: Props) => {
  const { _id, Name, Schema } = Form;
  const [isOpen, setIsOpen] = React.useState(true);
  const [dataValues, setDataValues] = useState(() => {
    let x: any = {};
    console.log(FormResponse);
    FormResponse.response!.forEach((e) => {
      x[e.id] = e.value;
    });
    return x;
  });
  const Actions = {
    updateResponse: async (data: TFormResponesDataValues[]) => {
      const currentTimestampString = getCurrentTimestampString();
      let body: TFormResponsesObj = {
        singleResponse: data,
        timeStamp: currentTimestampString,
      };
      console.log(body);
      try {
        await FormResponseApis.updateResponse(body, _id!, FormResponse._id!);
        swal("updated Sucessfully!");
        onclose();
      } catch (e) {
        swal("error occured" + e);
        onclose();
      }
    },
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          onclose();
        }}
        headerText={"Form Name : " + Name || ""}
      >
        <MainForm
          Values={dataValues}
          FormSchema={Schema}
          handleSubmit={(dict: any, data: TFormResponesDataValues[]) => {
            Actions.updateResponse(data);
          }}
        />
      </Modal>
    </div>
  );
};

export default EditingPreviousResponse;

function getCurrentTimestampString(): string {
  const currentDate: Date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return currentDate.toLocaleString("en-US", options);
}
