import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../stores";

interface State {
  isOpenModal: boolean;
}

const initialState: State = {
  isOpenModal: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    // 底层通过immer 这个库把不纯的函数转化为存函数
    // openProjectModal(state, action)
    openProjectModal(state) {
      state.isOpenModal = true;
    },
    closeProjectModal(state) {
      state.isOpenModal = false;
    },
  },
});

export const projectListAction = projectListSlice.actions;

export const selectProjectOpenModal = (state: RootState) =>
  state.projectList.isOpenModal;
