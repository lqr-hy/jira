import { SearchPanel } from "./search-panel";
import { List } from "./list";
import React, { useState } from "react";
// import qs from "qs";
import { useDebounce } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "../../utils/useProject";
import { useUsers } from "../../utils/use-users";

// const apiUrl = process.env["REACT_APP_API_URL"];
export const ProjectListScreen = () => {
  // input 输入的数据
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const debounceValue = useDebounce(params, 2000);
  const { isLoading, error, data: list } = useProject(debounceValue);
  const { data: users } = useUsers();
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
