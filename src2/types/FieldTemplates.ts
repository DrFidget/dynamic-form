import { TFields } from "./FormObject";

export const FieldTemplates: { [key: string]: TFields } = {
    textInput: {
        id: "text_input",
        fieldName: "Text Input",
        fieldType: "text",
        visible: true,
        enable: true,
        required: false,
        validation: {
            rules: []
        }
    },
    numberInput: {
        id: "number_input",
        fieldName: "Number Input",
        fieldType: "number",
        numberMin: 0,
        numberMax: 100,
        numberDecimal: false,
        visible: true,
        enable: true,
        required: false,
        validation: {
            rules: []
        }
    },
    checkbox: {
        id: "checkbox",
        fieldName: "Checkbox",
        fieldType: "checkbox",
        visible: true,
        enable: true,
        required: false,
        validation: {
            rules: []
        }
    },
    dropdown: {
        id: "dropdown",
        fieldName: "Dropdown",
        fieldType: "dropdown",
        options: ["Option 1", "Option 2", "Option 3"],
        visible: true,
        enable: true,
        required: false,
        validation: {
            rules: []
        }
    },
    radioGroup: {
        id: "radio_group",
        fieldName: "Radio Group",
        fieldType: "radio",
        options: ["Option 1", "Option 2", "Option 3"],
        visible: true,
        enable: true,
        required: false,
        validation: {
            rules: []
        }
    },
    textArea: {
        id: "text_area",
        fieldName: "Text Area",
        fieldType: "textarea",
        visible: true,
        enable: true,
        required: false,
        validation: {
            rules: []
        }
    },
    phoneNumber: {
        id: "phone_number",
        fieldName: "Phone Number",
        fieldType: "text",
        visible: true,
        enable: true,
        required: false,
        validation: {
            rules: [
                {
                    type: "regex",
                    rule: "^[0-9]{10}$",
                    msg: "Please enter a valid 10-digit phone number",
                    color: "#E70127"
                }
            ]
        }
    },
    email: {
        id: "email",
        fieldName: "Email",
        fieldType: "text",
        visible: true,
        enable: true,
        required: false,
        validation: {
            rules: [
                {
                    type: "regex",
                    rule: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
                    msg: "Please enter a valid email address",
                    color: "#E70127"
                }
            ]
        }
    },
    dateField: {
        id: "date",
        fieldName: "Date",
        fieldType: "date",
        visible: true,
        enable: true,
        required: false,
        validation: {
            rules: []
        }
    },
    address: {
        id: "address",
        fieldName: "Address",
        fieldType: "textarea",
        visible: true,
        enable: true,
        required: false,
        validation: {
            rules: []
        }
    }
};

export const getFieldTemplate = (templateName: string): TFields => {
    const template = FieldTemplates[templateName];
    if (!template) {
        throw new Error(`Template ${templateName} not found`);
    }
    
    // Create a deep copy and generate a unique ID
    const newField = JSON.parse(JSON.stringify(template));
    newField.id = `${templateName}_${Date.now()}`;
    return newField;
};