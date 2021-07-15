import { useUsers } from "../utils/use-users";
import { IdSelect } from "./id-select";
import React from "react";

export const UseSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};
