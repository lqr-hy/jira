import { useCallback, useReducer, useState } from "react";
import { useMountRef } from "./index";

interface State<D> {
  data: D | null;
  error: Error | null;
  // idle: 异步状态还没有发生 失败 成功 等待
  stat: "idle" | "error" | "success" | "loading";
}

const defaultState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};
const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountRef = useMountRef();

  return useCallback(
    (...args: T[]) => (mountRef.current ? dispatch(...args) : void 0),
    [dispatch, mountRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultState,
      ...initialState,
    }
  );
  // 解决异步数据还没回来的时候就退出了 或者异步数据回来慢的问题
  const safeDispatch = useSafeDispatch(dispatch);
  // 使用useState的惰性
  const [retry, setRetry] = useState(() => () => {});
  // 数据获取成功
  const setData = useCallback(
    (data: D) => safeDispatch({ data, stat: "success", error: null }),
    [safeDispatch]
  );
  // 数据获取失败
  const setError = useCallback(
    (error: Error) => safeDispatch({ data: null, error: error, stat: "error" }),
    [safeDispatch]
  );
  // 处理异步请求
  const run = useCallback(
    (promise: Promise<D>, retryConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入promise数据");
      }
      //保存 promise
      setRetry(() => () => {
        if (retryConfig?.retry) {
          return run(retryConfig?.retry(), retryConfig);
        }
      });
      // 发送请求设置状态为loading
      safeDispatch({ stat: "loading" });
      return (
        promise
          .then((data) => {
            console.log(data);
            setData(data);
            return data;
          })
          //  catch 会消化错误，所以不会抛出错误，
          .catch((error) => {
            setError(error);
            if (config.throwOnError) return Promise.reject(error);
            return error;
          })
      );
    },
    [config.throwOnError, safeDispatch, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    isLoading: state.stat === "loading",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
