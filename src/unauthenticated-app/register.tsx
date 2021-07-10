import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
// const apiUrl = process.env["REACT_APP_API_URL"];

export const RegisterScreens = () => {
  const { register } = useAuth();
  const handleLogin = (values: { username: string; password: string }) => {
    register(values);
  };
  return (
    <Form onFinish={handleLogin}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"请输入用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"请输入密码"} type="password" id={"password"} />
      </Form.Item>
      <LongButton htmlType={"submit"} type={"primary"}>
        注册
      </LongButton>
    </Form>
  );
};
