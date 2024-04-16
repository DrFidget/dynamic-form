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
};
