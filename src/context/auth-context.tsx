import React, { ReactNode, useCallback } from "react";

import * as auth from "auth-provider";
import { User } from "../screens/project-list/search-panel";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageError, FullPageLoading } from "../components/lib";
import * as authStore from "stores/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "stores/auth.slice";

export interface AuthForm {
  username: string;
  password: string;
}

// 初始化登录获取localstorage token
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, isError, isIdle, error, run } = useAsync<User | null>();

  useMount(
    useCallback(async () => {
      await run(bootstrapUser());
    }, [run])
  );

  if (isLoading || isIdle) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }
  return <>{children}</>;
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  const bootStrap = useCallback(
    () => dispatch(authStore.bootStrap()),
    [dispatch]
  );
  return {
    user,
    login,
    register,
    logout,
    bootStrap,
  };
};
