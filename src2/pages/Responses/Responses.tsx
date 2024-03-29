import React, { useEffect, useRef, useState } from "react";
import { TFormType } from "../../types/FormObject";
import { FormApis } from "../../service/API/Form/FormApi";
import styles from "./Responses.module.css";
import Button from "../../compoenents/Button";
import NewResponseCollector from "./FormResponseCollector/NewResponseCollector";
import { FormResponseApis } from "../../service/API/FormResponses/FormResponses";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import swal from "sweetalert";
interface Actions {
  fetchData: (
    setListOfForms: React.Dispatch<React.SetStateAction<TFormType[]>>
  ) => Promise<void>;
  fetchAndSetResponses: (
    selectedForm: number,
    ListOfForms: TFormType[],
    setResponses: React.Dispatch<React.SetStateAction<TFormResponsesObj[]>>
  ) => Promise<void>;
  deleteResponse: (formId: string, responsesId: string) => Promise<void>;
}

const Actions: Actions = {
  fetchData: async (setListOfForms) => {
    try {
      let list = (await FormApis.GetAllForms()) as TFormType[];
      setListOfForms(list);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  },
  fetchAndSetResponses: async (selectedForm, ListOfForms, setResponses) => {
    if (ListOfForms[selectedForm] && ListOfForms[selectedForm]._id) {
      try {
        const res = await FormResponseApis.getResponsesByFormId(
          ListOfForms[selectedForm]._id
        );
        if (res.length > 0) {
          setResponses(res);
          return;
        } else {
          setResponses([]);
        }
      } catch (error) {
        console.error("Error fetching responses:", error);
        setResponses([]);
      }
    }
  },
  deleteResponse: async (formId, responsesId) => {
    try {
      await FormResponseApis.deleteResponse(formId, responsesId);
    } catch (e) {
      console.log("error deleting: " + e);
    }
  },
};

const Responses: React.FC = () => {
  const [ListOfForms, setListOfForms] = useState<TFormType[]>([]);
  const [selectedForm, setSelectedForm] = useState<number>(0);
  const [collectingNewRes, setCollectingNewRes] = useState<boolean>(false);
  const [editingRes, setEditingRes] = useState<boolean>(false);
  const [responses, setResponses] = useState<TFormResponsesObj[]>([]);

  useEffect(() => {
    const func = async () => {
      await Actions.fetchData(setListOfForms);
    };
    func();
  }, []);

  useEffect(() => {
    Actions.fetchAndSetResponses(selectedForm, ListOfForms, setResponses);
  }, [selectedForm]);
  const ResponsesActions = {
    onEdit: () => {},
    onDelete: async (responseId: string) => {
      if (ListOfForms[selectedForm] && ListOfForms[selectedForm]._id) {
        await Actions.deleteResponse(ListOfForms[selectedForm]._id, responseId);
        Actions.fetchAndSetResponses(selectedForm, ListOfForms, setResponses);
        swal("deleted response");
      }
    },
  };
  return (
    <div style={{ paddingInline: "5rem" }}>
      <div style={{ textAlign: "center" }}>
        <h1 className={styles.mainHeading}>Forms</h1>
        <hr />
      </div>
      <div className={styles.container}>
        <div className={styles.a}>
          <h2>List of Forms</h2>
          {ListOfForms.length > 0 &&
            ListOfForms.map((e, k) => (
              <li
                className={styles.formList}
                key={k}
                onClick={() => setSelectedForm(k)}
              >
                {e.Name}
              </li>
            ))}
        </div>
        <div className={styles.b}>
          {ListOfForms.length > 0 && (
            <>
              <h2>{ListOfForms[selectedForm].Name}</h2> <hr />
            </>
          )}
          <div className={styles.responsesContainer}>
            <h3>Responses Submitted :</h3>
            {responses.length > 0 &&
              responses.map((e, k) => (
                <li key={k}>
                  <div className={styles.lidiv}>
                    <div>
                      <div className={styles.lidivItem1}>{e.timeStamp}</div>
                      <div className={styles.lidivItem2}>
                        <div>
                          <CiEdit size={25} />
                        </div>
                        <div
                          onClick={() => ResponsesActions.onDelete(e._id || "")}
                        >
                          <MdDeleteOutline size={25} />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </div>
          <div>
            <p>Submit a new Response</p>
            <Button
              text="Submit"
              color="blue"
              onClick={() => {
                setCollectingNewRes(true);
              }}
            />
          </div>
        </div>
      </div>

      {collectingNewRes && (
        <NewResponseCollector
          Form={ListOfForms[selectedForm]}
          onclose={() => {
            setCollectingNewRes(false);
            Actions.fetchAndSetResponses(
              selectedForm,
              ListOfForms,
              setResponses
            );
          }}
        />
      )}
    </div>
  );
};

export default Responses;
