import React, { useState } from "react";
import Modal from "../../../src2/compoenents/Modal";
import { TUserAuth } from "../../types/UserAuth";
import TextInput from "../../../src2/compoenents/TextInput";
import Button from "../../../src2/compoenents/Button";
import { AuthApis } from "../../service/api/Auth/AuthApis";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [cradentials, setcradentials] = useState<TUserAuth>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  return (
    <div>
      <Modal isOpen={true} onClose={() => {}} headerText="login">
        <TextInput
          label="name"
          onChange={(s) => setcradentials({ ...cradentials, name: s })}
          value={cradentials.name}
        />
        <TextInput
          label="email"
          onChange={(s) => setcradentials({ ...cradentials, email: s })}
          value={cradentials.email}
        />
        <TextInput
          label="password"
          onChange={(s) => setcradentials({ ...cradentials, password: s })}
          value={cradentials.password}
        />
        <Button
          text="login"
          color="blue"
          onClick={async () => {
            const reskey = await AuthApis.login(cradentials);
            if (reskey) {
              localStorage.setItem("token", reskey);
              navigate("/dashboard");
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default Admin;
