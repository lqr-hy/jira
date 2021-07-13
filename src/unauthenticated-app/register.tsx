import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";
// const apiUrl = process.env["REACT_APP_API_URL"];

export const RegisterScreens = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { isLoading, run } = useAsync(undefined, { throwOnError: true });
  const { register } = useAuth();
  const handleLogin = async ({
    verifyPassword,
    ...values
  }: {
    username: string;
    password: string;
    verifyPassword: string;
  }) => {
    // 两次密码不一样
    if (verifyPassword !== values.password) {
      onError(new Error("两次密码不一样请重新输入"));
      return;
    }
    try {
      await run(register(values));
    } catch (e) {
      onError(e);
    }
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
      <Form.Item
        name={"verifyPassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input
          placeholder={"请确认密码"}
          type="password"
          id={"verifyPassword"}
        />
      </Form.Item>
      <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
        注册
      </LongButton>
    </Form>
  );
};
