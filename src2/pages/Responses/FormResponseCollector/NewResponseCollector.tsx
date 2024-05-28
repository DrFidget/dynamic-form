import React from "react";
import { TFormType } from "../../../types/FormObject";
import MainForm from "../../../../src/compoenets/MainForm";
import Modal from "../../../compoenents/Modal";
import { FormResponseApis } from "../../../service/API/FormResponses/FormResponses";
import swal from "sweetalert";

interface Props {
  Form: TFormType;
  onclose: () => void;
}
const NewResponseCollector = ({ Form, onclose }: Props) => {
  const { _id, Schema, Name } = Form;
  const [isOpen, setIsOpen] = React.useState(true);
  const Actions = {
    submitResponse: async (data: TFormResponesDataValues[]) => {
      const currentTimestampString = getCurrentTimestampString();
      let body: TFormResponsesObj = {
        singleResponse: data,
        timeStamp: currentTimestampString,
      };
      try {
        await FormResponseApis.submitResponse(body, _id || "");
        swal("submitted SucessFully !");
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
        Name={undefined}
          handleSubmit={(dict: any, data: TFormResponesDataValues[]) => {
            Actions.submitResponse(data);
          }}
          FormSchema={JSON.parse(JSON.stringify(Schema))}
          Values={undefined}
        />
      </Modal>
    </div>
  );
};

export default NewResponseCollector;

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
