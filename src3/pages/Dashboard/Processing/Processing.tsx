import React, { useState } from "react";
import CustomCompoenent from "../../../compoenents/CustomCompoenent";
import { TOrder } from "../../../types/OrderType";
import { OrderApis } from "../../../service/api/Orders/OrderApis";
import Modal from "../../../../src2/compoenents/Modal";
import FormReport from "../../../../src/formReport/FormReport";
import Button from "../../../../src2/compoenents/Button";
import swal from "sweetalert";
import ModalVariableWidth from "../../../../src2/compoenents/ModalVariableWidth";
import TextArea from "../../../../src2/compoenents/TextArea";
interface Props {
  Styles?: React.CSSProperties;
  ProcessingOrders: TOrder[];
  Printing: TOrder[];
  refresh: () => void;
}
const Processing = ({ Styles, Printing, ProcessingOrders, refresh }: Props) => {
  const [viewdata, setViewData] = useState<TFormResponesDataValues[]>();
  const [view, setView] = useState<boolean>(false);
  const [viewingId, setViewingId] = useState<string>("");
  const [addComments, setAddComments] = useState({
    addcoments: false,
    Comments: "",
  });
  const Actions = {
    onPush: (ids: string[]) => {
      if (ids.length > 0) ids.forEach((e) => Actions.Approve(e));
      else {
        swal("select form");
      }
    },
    onPop: (ids: string[]) => {},
    onDelete: (ids: string[]) => {
      if (ids.length > 0) ids.forEach((e) => Actions.Reject(e));
      else {
        swal("select form");
      }
    },
    onView: (id: string) => {
      const data = ProcessingOrders.find((e) => e._id == id);
      const processing: any = {
        viewed: true,
      };
      if (!data) return;
      if (!data["processing"]) {
        data["processing"] = processing;
        Actions.updateOrder(id, data);
      }
      setView(true);
      setViewingId(id);
      const ListOfData =
        data.data.flat() as unknown as TFormResponesDataValues[];
      setViewData([...ListOfData]);
    },
    Approve: (id: string) => {
      const data = ProcessingOrders.find((item) => item._id === id);
      if (!data) return;
      if (!data["processing"]) {
        data["processing"] = {
          viewed: true,
          approved: true,
        };
      } else {
        data["processing"].approved = true;
      }
      data.stage = "printing";

      Actions.updateOrder(id, data);
      setView(false);
      setViewingId("");
      setViewData([]);

      // swal("Approved");
    },
    updateOrder: async (id: string, order: TOrder) => {
      await OrderApis.updateOrder(id, order);

      refresh();
    },
    Reject: (id: string) => {
      OrderApis.deleteOrder(id);
      refresh();
    },
    AddComments: () => {
      const data = ProcessingOrders.find((item) => item._id === viewingId);
      if (!data) return;
      if (!data["processing"]) {
        data["processing"] = {
          viewed: true,
          comments: addComments.Comments,
        };
      } else {
        data["processing"].comments = addComments.Comments;
      }
      setAddComments({
        addcoments: false,
        Comments: "",
      });
      Actions.updateOrder(viewingId, data);
      setView(false);
      setViewingId("");
      setViewData([]);
      setAddComments({
        addcoments: false,
        Comments: "",
      });
      swal("comments added");
    },
  };
  return (
    <div style={{ ...Styles }}>
      <CustomCompoenent
        Text1="Processing"
        Text2="Printing"
        DataList={ProcessingOrders}
        PushedList={Printing}
        onView={Actions.onView}
        onPush={Actions.onPush}
        onPop={Actions.onPop}
        onDelete={Actions.onDelete}
        Name="Order"
      />
      <Modal headerText="Report" isOpen={view} onClose={() => setView(false)}>
        <FormReport data={viewdata} />
        <hr />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            text="Add Comments"
            onClick={() => {
              setAddComments({
                ...addComments,
                addcoments: true,
              });
              // Actions.Approve();
            }}
            color="green"
          />
        </div>
      </Modal>
      <ModalVariableWidth
        headerText="Approve"
        isOpen={addComments.addcoments}
        onClose={() => setAddComments({ ...addComments, addcoments: false })}
      >
        <TextArea
          label="Add Comments"
          value={addComments.Comments}
          onChange={(s) => setAddComments({ ...addComments, Comments: s })}
        />
        <Button
          text="Add"
          onClick={() => {
            Actions.AddComments();
          }}
          color="green"
        />
      </ModalVariableWidth>
    </div>
  );
};

export default Processing;
