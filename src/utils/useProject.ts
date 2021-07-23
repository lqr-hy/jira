import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useCallback, useEffect } from "react";
import { clearObject } from "./index";
import { useHttp } from "./http";

export const useProject = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const fetchProject = useCallback(
    () => client("projects", { data: clearObject(params || {}) }),
    [params, client]
  );
  // 当params 改变的时候获取数据
  useEffect(() => {
    run(fetchProject(), { retry: fetchProject });
  }, [params, fetchProject, run]);

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: "POST",
        data: params,
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
