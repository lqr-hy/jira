import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { clearObject } from "./index";

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [urlQueryParam, setQueryParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: urlQueryParam.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [urlQueryParam]
    ),
    // 限制传入的Key值的范围
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = clearObject({
        ...Object.fromEntries(urlQueryParam),
        ...params,
      }) as URLSearchParamsInit;
      return setQueryParam(o);
    },
  ] as const;
};
