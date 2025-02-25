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
import {
  FaFileDownload,
  FaSearch,
  FaTrash,
  FaEdit,
  FaEye,
  FaPlus,
  FaFileAlt,
  FaCode,
} from "react-icons/fa";

const FORM_TEMPLATES = [
  {
    name: "Contact Form",
    schema: {
      /* Add template schema */
    },
  },
  {
    name: "Survey Form",
    schema: {
      /* Add template schema */
    },
  },
  {
    name: "Registration Form",
    schema: {
      /* Add template schema */
    },
  },
];

const Dashboard = () => {
  const [addForm, setAddForm] = useState(false);
  const [addExisting, setExisting] = useState("");
  const [formNameInput, setFormNameInput] = useState("");
  const [listOfForms, setListOfForms] = useState<TFormType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [activeModalTab, setActiveModalTab] = useState<
    "blank" | "template" | "existing"
  >("blank");

  const fetchData = async () => {
    try {
      setLoading(true);
      let list = (await FormApis.GetAllForms()) as unknown as TFormType[];
      setListOfForms(list);
    } catch (error) {
      console.error("Error fetching forms:", error);
      swal("Error", "Failed to fetch forms. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const filteredForms = listOfForms
    .filter((form) => {
      const formName = form.Name?.toLowerCase() || "";
      return formName.includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      const nameA = a.Name || "";
      const nameB = b.Name || "";

      if (sortBy === "name") {
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  const handleSort = (type: "name" | "date") => {
    if (sortBy === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(type);
      setSortOrder("asc");
    }
  };

  const handleSelectForm = (id: string) => {
    setSelectedForms((prev) =>
      prev.includes(id) ? prev.filter((formId) => formId !== id) : [...prev, id]
    );
  };

  const handleBatchDelete = async () => {
    if (!selectedForms.length) return;

    const confirmed = await swal({
      title: "Are you sure?",
      text: `You are about to delete ${selectedForms.length} form(s). This action cannot be undone.`,
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    });

    if (confirmed) {
      try {
        await Promise.all(selectedForms.map((id) => FormApis.deleteByID(id)));
        swal("Success", "Selected forms have been deleted.", "success");
        setSelectedForms([]);
        fetchData();
      } catch (error) {
        swal("Error", "Failed to delete forms. Please try again.", "error");
      }
    }
  };

  const resetModal = () => {
    setAddForm(false);
    setFormNameInput("");
    setExisting("");
    setActiveModalTab("blank");
  };

  const Actions = {
    validate: () => {
      if (!formNameInput.trim()) {
        swal("Error", "Please enter a form name", "error");
        return false;
      }
      return true;
    },
    addNewForm: () => {
      if (Actions.validate())
        navigate("/editor", { state: { formName: formNameInput } });
    },
    addExisting: {
      parseAndSend: () => {
        if (Actions.validate()) {
          try {
            const parsedSchema = JSON.parse(addExisting);
            navigate("/editor", {
              state: { parsedSchema, formName: formNameInput },
            });
          } catch (e) {
            swal("Error", "Please enter a valid JSON schema", "error");
          }
        }
      },
    },
    Table: {
      edit: (form: TFormType) => {
        navigate("/editor", {
          state: {
            parsedSchema: form.Schema,
            formName: form.Name || "Untitled Form",
            id: form._id,
            isEditingPrevForm: true,
          },
        });
      },
      delete: async (id: string) => {
        const confirmed = await swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this form!",
          icon: "warning",
          buttons: ["Cancel", "Delete"],
          dangerMode: true,
        });

        if (confirmed) {
          try {
            await FormApis.deleteByID(id);
            swal("Success", "Form has been deleted.", "success");
            fetchData();
          } catch (error) {
            swal("Error", "Failed to delete form. Please try again.", "error");
          }
        }
      },
      exportData: (data: TFormType) => {
        const exportData = {
          Name: data.Name || "untitled-form",
          Schema: data.Schema,
        };
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
          JSON.stringify(exportData, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `${(data.Name || "untitled-form")
          .toLowerCase()
          .replace(/\s+/g, "-")}.json`;
        link.click();
      },
      showResponses: (data: TFormType) => {
        navigate("/responses", { state: { FormObj: data } });
      },
    },
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1 className={styles.mainHeading}>Form Dashboard</h1>
        <Button
          styles={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          onClick={() => navigate("/responses")}
          text={<>Submit a Response</>}
          color="green"
        />
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{listOfForms.length}</div>
          <div className={styles.statLabel}>Total Forms</div>
        </div>
      </div>

      <div className={styles.toolBar}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search forms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          color="#007BFF"
          onClick={() => setAddForm(true)}
          text={
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <FaPlus /> New Form
            </div>
          }
        />
        {selectedForms.length > 0 && (
          <Button
            color="#E70127"
            onClick={handleBatchDelete}
            text={
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <FaTrash /> Delete Selected ({selectedForms.length})
              </div>
            }
          />
        )}
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.emptyState}>Loading forms...</div>
        ) : filteredForms.length === 0 ? (
          <div className={styles.emptyState}>
            {searchQuery
              ? "No forms match your search"
              : "No forms created yet"}
          </div>
        ) : (
          <table className={styles.customTable}>
            <thead>
              <tr>
                <th className={styles.customTableth}>
                  <input
                    type="checkbox"
                    checked={selectedForms.length === filteredForms.length}
                    onChange={(e) => {
                      setSelectedForms(
                        e.target.checked
                          ? filteredForms.map((form) => form._id || "")
                          : []
                      );
                    }}
                  />
                </th>
                <th
                  className={styles.customTableth}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("name")}
                >
                  Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className={styles.customTableth}>Actions</th>
                <th className={styles.customTableth}>Responses</th>
                <th className={styles.customTableth}>Export</th>
              </tr>
            </thead>
            <tbody>
              {filteredForms.map((form, index) => (
                <tr key={form._id || index}>
                  <td className={styles.customTabletd}>
                    <input
                      type="checkbox"
                      checked={selectedForms.includes(form._id || "")}
                      onChange={() => handleSelectForm(form._id || "")}
                    />
                  </td>
                  <td className={styles.customTabletd}>
                    {form.Name || "Untitled Form"}
                  </td>
                  <td className={styles.customTableActions}>
                    <div className={styles.tooltip} data-tooltip="Edit form">
                      <Button
                        color="#007BFF"
                        onClick={() => Actions.Table.edit(form)}
                        text={<FaEdit />}
                      />
                    </div>
                    <div className={styles.tooltip} data-tooltip="Delete form">
                      <Button
                        color="#E70127"
                        onClick={() => Actions.Table.delete(form._id || "")}
                        text={<FaTrash />}
                      />
                    </div>
                  </td>
                  <td className={styles.customTabletd}>
                    <div
                      className={styles.tooltip}
                      data-tooltip="View responses"
                    >
                      <Button
                        color="green"
                        onClick={() => Actions.Table.showResponses(form)}
                        text={<FaEye />}
                      />
                    </div>
                  </td>
                  <td className={styles.customTabletd}>
                    <div
                      className={styles.tooltip}
                      data-tooltip="Download form"
                      onClick={() => Actions.Table.exportData(form)}
                      style={{ cursor: "pointer" }}
                    >
                      <FaFileDownload color="white" size={20} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ModalVariableWidth
        headerText="Create a New Form"
        isOpen={addForm}
        onClose={resetModal}
      >
        <div className={styles.formContainer}>
          <TextInput
            value={formNameInput}
            onChange={(s) => setFormNameInput(s)}
            label="Form Name"
            placeHolder="Enter a name for your form"
          />

          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <Button
              text={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <FaFileAlt /> Blank Form
                </div>
              }
              color={activeModalTab === "blank" ? "#007BFF" : "#6c757d"}
              onClick={() => setActiveModalTab("blank")}
            />
            <Button
              text={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <FaCode /> Import JSON
                </div>
              }
              color={activeModalTab === "existing" ? "#007BFF" : "#6c757d"}
              onClick={() => setActiveModalTab("existing")}
            />
          </div>

          {activeModalTab === "blank" && (
            <div className={styles.modalSection}>
              <div className={styles.modalHeader}>Start with a blank form</div>
              <Button
                text="Create Blank Form"
                color="#007BFF"
                onClick={Actions.addNewForm}
              />
            </div>
          )}

          {activeModalTab === "existing" && (
            <div className={styles.modalSection}>
              <div className={styles.modalHeader}>Import from JSON</div>
              <div className={styles.optionContainer}>
                <TextArea
                  onChange={(s) => setExisting(s)}
                  label="Paste your form schema"
                  value={addExisting}
                  placeHolder="Paste your JSON schema here..."
                />
                <Button
                  text="Create from JSON"
                  color="#007BFF"
                  onClick={Actions.addExisting.parseAndSend}
                />
              </div>
            </div>
          )}
        </div>
      </ModalVariableWidth>
    </div>
  );
};

export default Dashboard;
