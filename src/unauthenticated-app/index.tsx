import { useState } from "react";
import { RegisterScreens } from "./register";
import { LoginScreens } from "./login";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <>
      {isRegister ? <RegisterScreens /> : <LoginScreens />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </>
  );
};
