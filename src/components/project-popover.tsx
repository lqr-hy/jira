import { Button, Divider, List, Popover, Typography } from "antd";
import { useProject } from "../utils/useProject";
import styled from "@emotion/styled";

export const ProjectPopover = () => {
  const { data: list, isLoading } = useProject();

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
      <Button style={{ padding: 0 }} type={"link"}>
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
