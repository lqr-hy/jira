import { Drawer } from "antd";

export const ProjectModal = (props: {
  openModal: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer onClose={props.onClose} width={"100%"} visible={props.openModal}>
      <h1>projectModal</h1>
      <button onClick={props.onClose}>关闭</button>
    </Drawer>
  );
};
