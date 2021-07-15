import { SearchPanel } from "./search-panel";
import { List } from "./list";
import React from "react";
// import qs from "qs";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "../../utils/useProject";
import { useUsers } from "../../utils/use-users";
import { useUrlQueryParams } from "../../utils/url";
// import { Helmet } from "react-helmet";
// const apiUrl = process.env["REACT_APP_API_URL"];
export const ProjectListScreen = () => {
  // input 输入的数据

  const [params, setParams] = useUrlQueryParams(["name", "personId"]);
  const debounceValue = useDebounce(params, 12000);
  const { isLoading, error, data: list } = useProject(debounceValue);
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      {/*<Helmet>*/}
      {/*  <title>项目列表</title>*/}
      {/*</Helmet>*/}
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
