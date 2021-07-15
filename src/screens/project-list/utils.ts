import { useUrlQueryParams } from "../../utils/url";
import { useMemo } from "react";

export const useProjectParams = () => {
  const [params, setParams] = useUrlQueryParams(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...params, personId: Number(params.personId) || undefined }),
      [params]
    ),
    setParams,
  ] as const;
};
