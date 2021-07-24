import { SearchPanel } from "./search-panel";
import { List } from "./list";
import React from "react";
// import qs from "qs";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProject } from "../../utils/useProject";
import { useUsers } from "../../utils/use-users";
// import { useUrlQueryParams } from "../../utils/url";
import { useProjectParams } from "./utils";
import { Row } from "../../components/lib";
import { useDispatch } from "react-redux";
import { projectListAction } from "./project-list.slice";
// import { Helmet } from "react-helmet";
// const apiUrl = process.env["REACT_APP_API_URL"];
export const ProjectListScreen = () => {
  // input 输入的数据

  const [param, setParams] = useProjectParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProject(useDebounce(param, 200));
  const { data: users } = useUsers();
  const dispatch = useDispatch();
  useDocumentTitle("项目列表", false);

  return (
    <Container>
      {/*<Helmet>*/}
      {/*  <title>项目列表</title>*/}
      {/*</Helmet>*/}
      <Row between={true}>
        <h1>项目列表</h1>
        <Button
          type={"link"}
          onClick={() => dispatch(projectListAction.openProjectModal())}
        >
          创建项目
        </Button>
      </Row>
      <SearchPanel params={param} setParams={setParams} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
