import swal from "sweetalert";
import axios from "axios";
import { TFormType } from "../../../types/FormObject";
import { useState } from "react";

type CallbackFunction<T> = (...args: any[]) => Promise<T>;

export const useLoadingState = <T>() => {
  const [loading, setLoading] = useState<boolean>(false);

  const withLoading = async (callback: CallbackFunction<T>, ...args: any[]) => {
    setLoading(true);
    try {
      await callback(...args);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return [loading, withLoading] as const;
};

export const FormApis = {
  CreateForm: async (Form: TFormType) => {
    // console.log(Form);

    try {
      let x = JSON.stringify(Form);
      const res = await axios.post("http://localhost:9000/form", x, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  },
  GetFormByID: async (id: string) => {
    try {
      const Response = await axios.get(`http://localhost:9000/form/${id}`);
      if (!Response) {
        console.log("No such id found!");
        return null;
      }
      return Response.data;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  },
  GetAllForms: async () => {
    try {
      const Response = await axios.get(`http://localhost:9000/form`);
      if (!Response) console.log("No Forms Found!");
      return Response.data as TFormType[];
    } catch (e) {
      console.log(e);
    }
    return [];
  },
  deleteByID: async (id: string) => {
    try {
      const Response = await axios.delete(`http://localhost:9000/form/${id}`);
      if (!Response) console.log("No such id found!");
      // else console.log(Response.data);
    } catch (e) {
      console.log(e);
    }
  },
  UpdateByID: async (id: string, updatedData: TFormType) => {
    try {
      const res = await axios.put(
        `http://localhost:9000/form/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Updated response ->", res.data);
    } catch (e) {
      console.log(e);
    }
  },
};
