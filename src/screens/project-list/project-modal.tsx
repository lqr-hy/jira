import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListAction,
  selectProjectOpenModal,
} from "./project-list.slice";

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectOpenModal);
  return (
    <Drawer
      onClose={() => dispatch(projectListAction.closeProjectModal())}
      width={"100%"}
      visible={projectModalOpen}
    >
      <h1>projectModal</h1>
      <button onClick={() => dispatch(projectListAction.closeProjectModal())}>
        关闭
      </button>
    </Drawer>
  );
};
