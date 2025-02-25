import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { TFields } from "../types/FormObject";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPaste: (field: TFields) => void;
}

const PasteJSONModal: React.FC<Props> = ({ isOpen, onClose, onPaste }) => {
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");

  const handlePaste = () => {
    try {
      const pastedData = JSON.parse(jsonText);

      // Validate TFields structure
      if (
        typeof pastedData === "object" &&
        pastedData !== null &&
        "fieldType" in pastedData
      ) {
        // Ensure required properties
        if (!pastedData.fieldName) {
          pastedData.fieldName = `New ${pastedData.fieldType} Field`;
        }
        if (!pastedData.id) {
          pastedData.id = `field_${Date.now()}`;
        } else {
          // If ID exists, make it unique
          pastedData.id = `${pastedData.id}_${Date.now()}`;
        }

        onPaste(pastedData);
        setJsonText("");
        setError("");
        onClose();
      } else {
        setError(
          "Invalid field structure. JSON must include at least a fieldType property."
        );
      }
    } catch (error) {
      setError("Invalid JSON format. Please check your input.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} headerText="Paste JSON Field">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder="Paste your JSON field here..."
          style={{
            width: "100%",
            minHeight: "200px",
            backgroundColor: "#1E1E1E",
            color: "#FFFFFF",
            border: "1px solid #333",
            borderRadius: "4px",
            padding: "8px",
            fontFamily: "monospace",
          }}
        />
        {error && (
          <div style={{ color: "#ff4444", marginTop: "8px" }}>{error}</div>
        )}
        <div
          style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
        >
          <Button color="#E70127" onClick={onClose} text="Cancel" />
          <Button
            color="green"
            onClick={handlePaste}
            text="Add Field"
            disabled={!jsonText.trim()}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PasteJSONModal;
