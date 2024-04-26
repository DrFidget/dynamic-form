import React, { useEffect, useState } from "react";
import { TOrder } from "../../../types/OrderType";
import { PieChart } from "react-minimal-pie-chart";
import styles from "./Dash.module.css";
import DropdownInput from "../../../../src2/compoenents/DropdownList";
import { FaBookOpen } from "react-icons/fa";
import ModalVariableWidth from "../../../../src2/compoenents/ModalVariableWidth";
import FormReport from "../../../../src/formReport/FormReport";
import Modal from "../../../../src2/compoenents/Modal";
interface Props {
  allOrders: TOrder[];
  Styles?: React.CSSProperties;
}

const Dash = ({ allOrders, Styles }: Props) => {
  const [orders, setOrders] = useState<TOrder[]>(() => allOrders);
  useEffect(() => {
    setOrders(allOrders);
  }, [allOrders]);

  const [pieData, setPieData] = useState([
    { title: "pending approval", value: 0, color: "#E38627", avg: 0 },
    { title: "processing", value: 0, color: "#C13C37", avg: 0 },
    { title: "printing", value: 0, color: "#6A2135", avg: 0 },
    { title: "ready", value: 0, color: "#FFFFFF", avg: 0 },
  ]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (orders.length > 0) {
      let pending = 0,
        processing = 0,
        printing = 0,
        ready = 0;
      orders.forEach((e) => {
        if (e.stage == "pending approval") pending += 1;
        if (e.stage == "processing") processing += 1;
        if (e.stage == "printing") printing += 1;
        if (e.stage == "ready") ready += 1;
      });
      setPieData([
        {
          title: "pending approval",
          value: pending,
          color: "#F8887D",
          avg: (pending * 10) / orders.length,
        },
        {
          title: "processing",
          value: processing,
          color: "#ADDAE9",
          avg: (processing * 10) / orders.length,
        },
        {
          title: "printing",
          value: printing,
          color: "#74DBCC",
          avg: (printing * 10) / orders.length,
        },
        {
          title: "ready",
          value: ready,
          color: "#F4DAB1",
          avg: (ready * 10) / orders.length,
        },
      ]);
    }
  }, [orders]);
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const x = pieData.find((e) => e.title === filter);
    if (x) {
      // console.log(-40 * x.avg);
      setAngle(-40 * x.avg);
    }
  }, [filter]);
  const [isViewing, setIsViewing] = useState<any>({
    isViewing: false,
    payLoad: {},
  });
  return (
    <div className={styles.container} style={{ ...Styles }}>
      <h1 className={styles.heading}>Dashboard</h1>
      <hr />
      <h2 style={{ textAlign: "center" }}>Orders</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.chartContainer}>
          <PieChart
            animate={true}
            animationDuration={1500}
            animationEasing="ease-out"
            reveal={100}
            data={pieData}
            label={({ dataEntry }) => dataEntry.title}
            labelPosition={65}
            labelStyle={{ fontSize: "3px" }}
            lineWidth={80}
            startAngle={angle}
            onClick={(e, no) => console.log(no)}
            radius={40}
          />
        </div>
      </div>

      <div className={styles.dataContainer}>
        <div style={{ width: "20%" }}>
          <DropdownInput
            values={["pending approval", "processing", "printing", "ready"]}
            label="select category"
            onChange={(s) => setFilter(s)}
            selectedValue={filter}
            options={["Pending Approval", "Processing", "Printing", "Ready"]}
          />
        </div>
        <div className={styles.tableContainer}>
          {orders
            .filter((e) => e.stage === filter)
            .map((e, k) => (
              <div className={styles.listItems} key={k}>
                <li>
                  order {k + 1} ({e.stage})
                </li>
                <div>{e.timeStamp}</div>
                <div
                  className={styles.open}
                  onClick={() =>
                    setIsViewing({
                      isViewing: true,
                      payLoad: e.data.flat(),
                    })
                  }
                >
                  <FaBookOpen />
                </div>
              </div>
            ))}
        </div>
      </div>
      <Modal
        headerText="Order"
        isOpen={isViewing.isViewing}
        onClose={() => setIsViewing({ ...isViewing, isViewing: false })}
      >
        <FormReport data={isViewing.payLoad} />
      </Modal>
    </div>
  );
};

export default Dash;
