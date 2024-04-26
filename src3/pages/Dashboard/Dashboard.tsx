import React, { useState, FC, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Dash from "./Dash/Dash";
import Processing from "./Processing/Processing";
import Printing from "./Printing/Printing";
import RedyToDeliver from "./RedyToDeliver/RedyToDeliver";
import { TOrder } from "../../types/OrderType";
import { OrderApis } from "../../service/api/Orders/OrderApis";
import PendingApproval from "./PendingApproval/PendingApproval";
import { AuthApis } from "../../service/api/Auth/AuthApis";
import { useNavigate } from "react-router-dom";

const NavItems = [
  {
    name: "Dashboard",
  },
  {
    name: "Pending Approval",
  },
  {
    name: "Processing",
  },
  {
    name: "Printing",
  },
  {
    name: "Redy To Deliver",
  },
];

const Dashboard: FC = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const navigator = useNavigate();
  const fetchOrders = async () => {
    try {
      const x = await OrderApis.getOrders();
      if (x) setOrders(x);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await AuthApis.authenticateUser();
      if (res) {
        console.log("authenticated");
      } else {
        console.log("not authenticated");
        localStorage.clear();
        navigator("/admin");
      }
    };
    // fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 100000);

    return () => clearInterval(intervalId);
  }, []);
  const [selectedCompoenet, setSelectedComponent] = useState("Dashboard");
  // const [dataToShow,setDataToShow] = useState<any>({
  //   show: true,
  //   data: [],
  // });
  return (
    <div className={styles.container}>
      <div className={styles.sidepanel}>
        <div className={styles.admin}>Admin</div>
        <div className={styles.navigation}>
          {NavItems.map((item, index) => (
            <li
              style={{
                scale: selectedCompoenet === item.name ? "1.05" : "1",
              }}
              key={index}
              className={styles.navItem}
              onClick={() => setSelectedComponent(item.name)}
            >
              {item.name}
            </li>
          ))}
        </div>
      </div>
      <div className={styles.mainBody}>
        {(function () {
          switch (selectedCompoenet) {
            case "Processing":
              return (
                <Processing
                  refresh={() => fetchOrders()}
                  ProcessingOrders={orders.filter(
                    (order) => order.stage === "processing"
                  )}
                  Printing={orders.filter(
                    (order) => order.stage === "printing"
                  )}
                  Styles={{
                    backgroundColor: "#0A0B11",
                    padding: "40px",
                  }}
                />
              );
            case "Printing":
              return (
                <Printing
                  Printing={orders.filter((e) => e.stage === "printing")}
                  refresh={() => fetchOrders()}
                  Ready={orders.filter((e) => e.stage === "ready")}
                  Styles={{
                    backgroundColor: "#0A0B11",
                    padding: "40px",
                  }}
                />
              );
            case "Dashboard":
              return (
                <Dash
                  allOrders={orders}
                  Styles={{
                    backgroundColor: "#0A0B11",
                    padding: "40px",
                  }}
                />
              );
            case "Pending Approval":
              return (
                <PendingApproval
                  refresh={() => fetchOrders()}
                  PendingOrders={orders.filter(
                    (e) => e.stage === "pending approval"
                  )}
                  ProcessingOrders={orders.filter(
                    (e) => e.stage === "processing"
                  )}
                  Styles={{
                    backgroundColor: "#0A0B11",
                    padding: "40px",
                  }}
                />
              );
            case "Redy To Deliver":
              return (
                <RedyToDeliver
                  Styles={{
                    backgroundColor: "#0A0B11",
                    padding: "40px",
                  }}
                />
              );
          }
        })()}
        {/* <Dash allOrders={orders} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
