import { SearchPanel } from "./search-panel";
import { List } from "./list";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { clearObject } from "utils/index";
import { useDebounce, useMount } from "../../utils";

const apiUrl = process.env["REACT_APP_API_URL"];
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

  const debounceValue = useDebounce(params, 2000);
  // 当params 改变的时候获取数据
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(clearObject(debounceValue))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceValue]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  return (
    <>
      <SearchPanel params={params} setParams={setParams} users={users} />
      <List users={users} list={list} />
    </>
  );
};
