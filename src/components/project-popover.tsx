import { Button, Divider, List, Popover, Typography } from "antd";
import { useProject } from "../utils/useProject";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { projectListAction } from "../screens/project-list/project-list.slice";

export const ProjectPopover = () => {
  const { data: list, isLoading } = useProject();
  const dispatch = useDispatch();

  const popoverListData = list?.filter((list) => list.pin);

  const popoverList = (
    <Container>
      <Typography.Text type={"secondary"}>项目</Typography.Text>
      <List loading={isLoading}>
        {popoverListData?.map((e) => (
          <List.Item>
            <List.Item.Meta title={e.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <Button
        type={"link"}
        onClick={() => dispatch(projectListAction.openProjectModal())}
      >
        创建项目
      </Button>
    </Container>
  );

  return (
    <Popover placement={"bottom"} content={popoverList}>
      <span>项目</span>
    </Popover>
  );
};

const Container = styled.div`
  width: 30rem;
`;
