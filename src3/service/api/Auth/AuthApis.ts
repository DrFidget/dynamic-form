import swal from "sweetalert";
import { TUserAuth } from "../../../types/UserAuth";
import axios from "axios";

export const AuthApis = {
  login: async (data: TUserAuth) => {
    try {
      const res = await axios.post(
        "http://localhost:9000/userAuth/login",
        data
      );
      return res.data;
    } catch (error: any) {
      console.log(error.response.data);
    }
  },
  authenticateUser: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:9000/userAuth/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.status === 200 ? true : false;
    } catch (e) {}
  },
};
