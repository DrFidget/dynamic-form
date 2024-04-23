import React, { useState } from "react";
import CustomCompoenent from "../../../compoenents/CustomCompoenent";
import { TOrder } from "../../../types/OrderType";
import FormReport from "../../../../src/formReport/FormReport";
import Modal from "../../../../src2/compoenents/Modal";
import Button from "../../../../src2/compoenents/Button";
import { OrderApis } from "../../../service/api/Orders/OrderApis";
import swal from "sweetalert";
import TextArea from "../../../../src2/compoenents/TextArea";
import ModalVariableWidth from "../../../../src2/compoenents/ModalVariableWidth";
interface Props {
  Styles?: React.CSSProperties;
  PendingOrders: TOrder[];
  ProcessingOrders: TOrder[];
  refresh: () => void;
}
const PendingApproval = ({
  Styles,
  PendingOrders,
  ProcessingOrders,
  refresh,
}: Props) => {
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
      const data = PendingOrders.find((item) => item._id === id);
      const pending: any = {
        viewed: true,
      };
      if (!data) return;
      if (!data["pending approval"]) {
        data["pending approval"] = pending;
        Actions.updateOrder(id, data);
      }
      setView(true);
      setViewingId(id);
      const ListOfData =
        data.data.flat() as unknown as TFormResponesDataValues[];
      setViewData([...ListOfData]);
    },
    updateOrder: async (id: string, order: TOrder) => {
      await OrderApis.updateOrder(id, order);

      refresh();
    },
    Approve: (id: string) => {
      const data = PendingOrders.find((item) => item._id === id);
      if (!data) return;
      if (!data["pending approval"]) {
        data["pending approval"] = {
          viewed: true,
          approved: true,
        };
      } else {
        data["pending approval"].approved = true;
      }
      data.stage = "processing";

      Actions.updateOrder(id, data);
      setView(false);
      setViewingId("");
      setViewData([]);

      // swal("Approved");
    },
    AddComments: () => {
      const data = PendingOrders.find((item) => item._id === viewingId);
      if (!data) return;
      if (!data["pending approval"]) {
        data["pending approval"] = {
          viewed: true,
          comments: addComments.Comments,
        };
      } else {
        data["pending approval"].comments = addComments.Comments;
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
    Reject: (id: string) => {
      OrderApis.deleteOrder(id);
      refresh();
    },
  };

  return (
    <div style={{ ...Styles }}>
      {" "}
      <CustomCompoenent
        PushedList={ProcessingOrders}
        DataList={PendingOrders}
        onDelete={Actions.onDelete}
        onPop={Actions.onPop}
        onPush={Actions.onPush}
        onView={Actions.onView}
        Name="Order"
        Text1="Pending Approval"
        Text2="Processing"
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

export default PendingApproval;
