import { request, response } from "express";
import { TFields } from "../../types/FormType.js";
import Form from "./Form.model.js";

const form: TFields[] = [];
export const formMethods = {
  createForm: async (req: request, res: response) => {
    try {
      const CompleteForm = req.body;

      try {
        const NewForm = new Form({
          Name: CompleteForm.Name,
          Schema: CompleteForm.Schema,
        });
        await NewForm.save();
      } catch (e) {
        console.log(e);
      }
      res.status(201).send("sent");
    } catch (e) {
      res.send(e);
      res.status(401);
    }
  },
  getForm: {
    byId: async (req: request, res: response) => {
      try {
        const formId = req.params.id;
        // console.log(formId);
        const foundForm = await Form.findById(formId);
        if (!foundForm) {
          return res.status(404).send("Form not found");
        }
        res.status(200).send(foundForm);
      } catch (e) {
        res.status(500).send(e);
      }
    },
    all: async (req: request, res: response) => {
      try {
        const foundForms = await Form.find({});
        if (foundForms.length === 0) {
          return res.status(404).send("Form not found");
        }
        res.status(200).send(foundForms);
      } catch (e) {
        res.status(500).send(e);
      }
    },
  },
  updateForm: async (req: request, res: response) => {
    try {
      const formId = req.params.id;
      const newForm = req.body;

      try {
        const existingForm = await Form.findById(formId);
        if (!existingForm) {
          return res.status(404).send("Form not found");
        }

        existingForm.Name = newForm.Name || existingForm.Name;
        existingForm.Schema = newForm.Schema || existingForm.Schema;
        await existingForm.save();

        res.status(200).send(existingForm);
      } catch (e) {
        res.status(500).send("Internal Server Error");
      }
    } catch (e) {
      res.status(400).send("Bad Request");
    }
  },
  deleteForm: async (req: request, res: response) => {
    try {
      const formId = req.params.id;
      try {
        const deletedForm = await Form.findByIdAndDelete(formId);

        if (!deletedForm) {
          return res.status(404).send("Form not found");
        }
        res.status(200).send("Form deleted successfully");
      } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
      }
    } catch (e) {
      console.log(e);
      res.status(400).send("Bad Request");
    }
  },
};
