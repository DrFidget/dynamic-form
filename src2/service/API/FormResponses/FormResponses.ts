import axios from "axios";

export const FormResponseApis = {
  submitResponse: async (body: TFormResponsesObj, formId: string) => {
    try {
      const res = await axios.post(
        `http://172.19.91.78:9000/formResponse/${formId}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  },
  updateResponse: async (
    body: TFormResponsesObj,
    formID: string,
    responseId: string
  ) => {
    try {
      const res = await axios.put(
        `http://172.19.91.78:9000/formResponse/${formID}/${responseId}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  },
  getResponsesByFormId: async (formId: string) => {
    try {
      const response = await axios.get(
        `http://172.19.91.78:9000/formResponse/${formId}`
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  deleteResponse: async (formID: string, responseId: string) => {
    try {
      const response = await axios.delete(
        `http://172.19.91.78:9000/formResponse/${formID}/${responseId}`
      );
    } catch (e) {
      console.log(e);
    }
  },
};
