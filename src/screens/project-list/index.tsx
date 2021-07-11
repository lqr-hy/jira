import { SearchPanel } from "./search-panel";
import { List } from "./list";
import React, { useEffect, useState } from "react";
// import qs from "qs";
import { clearObject } from "utils/index";
import { useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";

// const apiUrl = process.env["REACT_APP_API_URL"];
export const ProjectListScreen = () => {
  // input 输入的数据
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  // 下拉框数据
  const [users, setUsers] = useState([]);

  // 数据列表
  const [list, setList] = useState([]);

  const client = useHttp();
  const debounceValue = useDebounce(params, 2000);
  // 当params 改变的时候获取数据
  useEffect(() => {
    client("projects", { data: clearObject(debounceValue) }).then(setList);
  }, [debounceValue, client]);

  useMount(() => {
    client("users").then((res) => setUsers(res));
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} users={users} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
