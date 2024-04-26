import React, { useState } from "react";
import { TOrder } from "../../../types/OrderType";
import swal from "sweetalert";
import { OrderApis } from "../../../service/api/Orders/OrderApis";
import CustomCompoenent from "../../../compoenents/CustomCompoenent";
import { Modal } from "react-bootstrap";
import FormReport from "../../../../src/formReport/FormReport";
import Button from "../../../../src2/compoenents/Button";
import ModalVariableWidth from "../../../../src2/compoenents/ModalVariableWidth";
import TextArea from "../../../../src2/compoenents/TextArea";
interface Props {
  Styles?: React.CSSProperties;
  Ready: TOrder[];
  Printing: TOrder[];
  refresh: () => void;
}
const Printing = ({ Styles, Ready, Printing, refresh }: Props) => {
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
      const data = Printing.find((e) => e._id == id);
      const printing: any = {
        viewed: true,
      };
      if (!data) return;
      if (!data["printing"]) {
        data["printing"] = printing;
        Actions.updateOrder(id, data);
      }
      setView(true);
      setViewingId(id);
      const ListOfData =
        data.data.flat() as unknown as TFormResponesDataValues[];
      setViewData([...ListOfData]);
    },
    Approve: (id: string) => {
      const data = Printing.find((item) => item._id === id);
      if (!data) return;
      if (!data["printing"]) {
        data["printing"] = {
          viewed: true,
          approved: true,
        };
      } else {
        data["printing"].approved = true;
      }
      data.stage = "ready";

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
      const data = Printing.find((item) => item._id === viewingId);
      if (!data) return;
      if (!data["printing"]) {
        data["printing"] = {
          viewed: true,
          comments: addComments.Comments,
        };
      } else {
        data["printing"].comments = addComments.Comments;
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
        Text1="Printing"
        Text2="Ready to Deliver"
        DataList={Printing}
        PushedList={Ready}
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

export default Printing;
