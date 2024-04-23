import axios from "axios";
import { TOrder } from "../../../types/OrderType";
import swal from "sweetalert";

interface TResponseOfOrders {
  message: string;
  _id?: string;
  data: TOrder[];
}

const baseUrl = "http://localhost:9000/order";
export const OrderApis = {
  createOrder: async (data: TOrder) => {
    try {
      return await axios.post(baseUrl, data);
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  getOrders: async () => {
    const token = localStorage.getItem("token");
    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data as TResponseOfOrders;
      return data.data;
    } catch (e: any) {
      console.log(e.message);
      return [];
    }
  },
  getOrder: async (id: string) => {
    try {
      return await axios.get(`${baseUrl}/${id}`);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  updateOrder: async (id: string, data: TOrder) => {
    const token = localStorage.getItem("token");
    try {
      return await axios.put(`${baseUrl}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  deleteOrder: async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      return await axios.delete(`${baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};
