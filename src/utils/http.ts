import * as auth from "auth-provider";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env["REACT_APP_API_URL"];

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endPoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
      "content-type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  // fetch 不会对 400 | 500 抛出异常
  return window
    .fetch(`${apiUrl}/${endPoint}`, config)
    .then(async (response) => {
      // 如果返回的是401表示token 过期
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ messages: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endPoint, config]: Parameters<typeof http>) =>
    http(endPoint, { ...config, token: user?.token });
};
