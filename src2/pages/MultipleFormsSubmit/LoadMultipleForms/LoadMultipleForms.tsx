import React, { useEffect, useState } from "react";
import Modal from "../../../compoenents/Modal";
import Carousel from "../../../compoenents/Carousel";
import MainForm from "../../../../src/compoenets/MainForm";
import swal from "sweetalert";
import { TFormType } from "../../../types/FormObject";
import ProgressMonitor from "./progressMonitor";
interface Props {
  ListOfForms: TFormType[];
}
const LoadMultipleForms = ({ ListOfForms }: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [current, setcurrent] = useState(0);
  const [visited, setVisited] = useState(() => {
    let temp: any = {};
    for (let i = 0; i < ListOfForms.length; i++) {
      temp[i] = false;
    }
    temp[current] = true;
    return temp;
  });
  const [formsData, setFormsData] = useState<TFormResponesDataValues[]>([]);
  const [formsValues, setFormsValues] = useState<any[]>([]);
  const Actions = {
    handleSubmit: (
      values: any,
      data: TFormResponesDataValues,
      index: number
    ) => {
      if (index < formsData.length) {
        let x = [...formsData];
        let y = [...formsValues];
        x[index] = data;
        y[index] = values;
        setFormsData([...x]);
        setFormsValues([...y]);
      } else {
        setFormsData([...formsData, data]);

        setFormsValues([...formsValues, values]);
      }

      if (current == ListOfForms.length - 1) {
        swal("submitted");
        setIsOpen(false);
        return;
      }
      setcurrent((p) => p + 1);
      setVisited({ ...visited, [current + 1]: true });
    },
    ProgressMonitor: {
      chnageIndex: (index: number) => {
        setcurrent(index);
      },
    },
  };

  return (
    <Modal
      headerText="Multiple Forms"
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <ProgressMonitor
        length={ListOfForms.length}
        current={current}
        changeIndex={Actions.ProgressMonitor.chnageIndex}
        visited={visited}
      />
      <Carousel current={current}>
        {ListOfForms.map((e, k) => (
          <>
            <MainForm
              Name={e.Name}
              key={k}
              FormSchema={e.Schema}
              Values={formsValues[k]}
              handleSubmit={(values: any, data: TFormResponesDataValues) => {
                Actions.handleSubmit(values, data, k);
              }}
            />
          </>
        ))}
      </Carousel>
    </Modal>
  );
};

export default LoadMultipleForms;
