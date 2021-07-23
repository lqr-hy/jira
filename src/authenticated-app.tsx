import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "./screens/project";
import { resetRoute } from "./utils";
import { ProjectModal } from "./screens/project-list/project-modal";
import { useState } from "react";
import { ProjectPopover } from "./components/project-popover";

export const AuthenticatedApp = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <Container>
      <PageHeader
        projectButton={
          <Button type={"link"} onClick={() => setIsOpenModal(true)}>
            创建项目
          </Button>
        }
      />
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen
                  projectButton={
                    <Button type={"link"} onClick={() => setIsOpenModal(true)}>
                      创建项目
                    </Button>
                  }
                />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={"/projects"} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        openModal={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </Container>
  );
};

const PageHeader = (props: { projectButton: JSX.Element }) => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgba(38,132,255)"} />
        </Button>
        <ProjectPopover projectButton={props.projectButton} />
        <span>项目3</span>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <MenuItem key={"logout"}>
                <a href={"/#"} onClick={logout}>
                  退出
                </a>
              </MenuItem>
            </Menu>
          }
        >
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;
