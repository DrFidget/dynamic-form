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
import state from "sweetalert/typings/modules/state";

const Dashboard = () => {
  const [addForm, setAddform] = useState(false);
  const [addExisting, setExisting] = useState("");
  const [formNameinput, setFromNameinput] = useState("");
  const [ListOfForms, setListOfForms] = useState<TFormType[]>([]);
  const fetchData = async () => {
    try {
      let list = (await FormApis.GetAllForms()) as unknown as TFormType[];
      setListOfForms(list);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };
  useEffect(() => {
    fetchData();
    // console.log("rerenderd");
  }, []);

  const navigate = useNavigate();
  const Actions = {
    validate: () => {
      if (formNameinput === "") {
        swal("please enter from name");
        return false;
      } else return true;
    },
    addNewForm: () => {
      if (Actions.validate())
        navigate("/editor", { state: { formName: formNameinput } });
    },
    addExisting: {
      parseAndSend: () => {
        if (Actions.validate()) {
          let parsedSchema = addExisting;
          try {
            parsedSchema = JSON.parse(parsedSchema);
            navigate("/editor", {
              state: { parsedSchema, formName: formNameinput },
            });
          } catch (e) {
            swal("please enter correct json schema");
          }
        }
      },
    },
    Table: {
      edit: (e: TFormType) => {
        const { _id, Schema, Name } = e;
        navigate("/editor", {
          state: {
            parsedSchema: Schema,
            formName: Name,
            id: _id,
            isEditingPrevForm: true,
          },
        });
      },
      delete: async (id: string) => {
        await FormApis.deleteByID(id);
        fetchData();
      },
      exportData: (data: TFormType) => {
        let x = {
          Name: data.Name,
          Schema: data.Schema,
        };
        // Indent JSON with 2 spaces
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
          JSON.stringify(x, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";

        link.click();
      },
      LoadForm: (data: TFormType) => {
        let x = JSON.parse(JSON.stringify(data));
        navigate("/presenter", { state: { FormDataToLoad: x } });
      },
      showResponses: (data: TFormType) => {
        let x = JSON.parse(JSON.stringify(data));
        navigate("/responses", { state: { FormObj: x } });
      },
    },
  };
  return (
    <div style={{ paddingInline: "5rem",position:"relative"}}>
      <Button styles={{
        position:"absolute",
        top:"20",
        left:"20"
      }} onClick={()=>{
        navigate('/responses');
      }} text="< Submit a Response" color="green"/>
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
                  <th className={`${styles.customTableth}`}>Responses</th>
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
                      <Button
                        color="#007BFF"
                        onClick={() => {
                          Actions.Table.edit(e);
                        }}
                        text="edit"
                      />
                      <Button
                        color="#E70127"
                        onClick={() => {
                          Actions.Table.delete(e._id || "");
                        }}
                        text="Delete"
                      />
                    </td>
                    <td className={`${styles.customTabletd}`}>
                      {/* <Button
                        color="green"
                        onClick={() => {
                          Actions.Table.LoadForm(e);
                        }}
                        text="Load"
                      ></Button> */}
                      <Button
                        color="green"
                        onClick={() => {
                          Actions.Table.showResponses(e);
                        }}
                        text="Show"
                      ></Button>
                    </td>
                    <td className={`${styles.customTabletd}`}>
                      <div onClick={() => Actions.Table.exportData(e)}>
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
                    Actions.addExisting.parseAndSend();
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
