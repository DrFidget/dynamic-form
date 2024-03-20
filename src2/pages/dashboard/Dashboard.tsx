import React, { useEffect, useState } from "react";
import Button from "../../compoenents/Button";
import ModalVariableWidth from "../../compoenents/ModalVariableWidth";
import styles from "./Dashboard.module.css";
import TextArea from "../../compoenents/TextArea";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import TextInput from "../../compoenents/TextInput";
import { FormApis } from "../../service/API/Form/FormApi";
import { TFields, TFormType } from "../../types/FormObject";
import { FaFileDownload } from "react-icons/fa";

const Dashboard = () => {
  const [addForm, setAddform] = useState(false);
  const [addExisting, setExisting] = useState("");
  const [formNameinput, setFromNameinput] = useState("");
  const [ListOfForms, setListOfForms] = useState<TFormType[]>([]);
  const fetchData = async () => {
    try {
      let list = await FormApis.GetAllForms();
      setListOfForms(list as unknown as TFormType[]);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  const Actions = {
    addNewForm: () => {
      navigate("/editor");
    },
    addExisting: {
      validate: () => {
        // console.log("tyring");
        let parsedSchema = addExisting;
        try {
          parsedSchema = JSON.parse(parsedSchema);
          // console.log(typeof parsedSchema);
          navigate("/editor", {
            state: { parsedSchema, formName: formNameinput },
          });
        } catch (e) {
          swal("error occured");
        }
      },
    },
    Table: {
      edit: (id: string, addExisting: TFormType) => {
        navigate("/editor", { state: {} });
      },
      delete: (id: string) => {
        FormApis.deleteByID(id);
        fetchData();
      },
    },
  };
  return (
    <div style={{ paddingInline: "5rem" }}>
      <div style={{ textAlign: "center" }}>
        <h1 className={styles.mainHeading}>Dashboard</h1>
        <hr />
      </div>

      <div>
        <div className={styles.container1}>
          <div className={styles.roww}>
            <h2>Create new form</h2>

            <Button
              color="#007BFF"
              onClick={() => {
                setAddform(true);
              }}
              text="Add Form"
              key="1"
            />
          </div>
          {/* <div className={styles.roww}></div> */}
        </div>
        <div className={`${styles.tableContainer}`}>
          {ListOfForms.length > 0 && (
            <table className={`${styles.customTable}`}>
              <thead>
                <tr className={`${styles.customTable}`}>
                  <th className={`${styles.customTableth}`}>#</th>
                  <th className={`${styles.customTableth}`}>Name</th>
                  <th className={`${styles.customTableth}`}>Actions</th>
                  <th className={`${styles.customTableth}`}>Download</th>
                </tr>
              </thead>
              <tbody>
                {ListOfForms.map((e, k) => (
                  <tr key={k} className={`${styles.customTable}`}>
                    <td className={`${styles.customTabletd}`}>{k + 1}</td>
                    <td className={`${styles.customTabletd}`}>{e.Name}</td>
                    <td
                      className={`${styles.customTableActions}`}
                      // style={{ maxWidth: "" }}
                    >
                      <Button color="#007BFF" onClick={() => {}} text="edit" />
                      <Button
                        color="#E70127"
                        onClick={() => {
                          Actions.Table.delete(e._id || "");
                        }}
                        text="Delete"
                      />
                    </td>
                    <td className={`${styles.customTabletd}`}>
                      <div>
                        <FaFileDownload color="white" size={30} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <ModalVariableWidth
          headerText="Add a new form"
          isOpen={addForm}
          onClose={() => setAddform(false)}
        >
          <div className={`${styles.upperContainer}`}>
            <TextInput
              value={formNameinput}
              onChange={(s) => {
                setFromNameinput(s);
              }}
              label="Enter Form Name"
            />
            <div className={`${styles.container}`}>
              <div>
                <Button
                  text="Create New"
                  color="#007BFF"
                  onClick={Actions.addNewForm}
                />
              </div>
              <div className={`${styles.vertical_divider}`}></div>
              <div>
                <TextArea
                  onChange={(s) => {
                    setExisting(s);
                  }}
                  label="Paste An Existing Schema"
                  value={addExisting}
                />
                <Button
                  text="Create"
                  color="#007BFF"
                  onClick={() => {
                    Actions.addExisting.validate();
                  }}
                />
              </div>
            </div>
          </div>
        </ModalVariableWidth>
      </div>
    </div>
  );
};

export default Dashboard;
