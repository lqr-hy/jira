import { useCallback, useReducer } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { newPresent, type } = action;
  switch (type) {
    case UNDO: {
      // 如果没有就不能返回
      if (past.length === 0) return state;
      // 上一次的值
      const previous = past[past.length - 1];
      // 新的past数组
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }
    case REDO: {
      // 是否能前进
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        future: newFuture,
        past: [...past, present],
        present: next,
      };
    }
    case SET: {
      if (newPresent === present) return state;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
  return state;
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);
  // 判断是否可以undo
  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  // 返回上一次操作
  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: REDO });
  }, []);

  const set = useCallback((newPresent: T) => {
    dispatch({ type: SET, newPresent });
  }, []);

  const reset = useCallback((newPresent: T) => {
    dispatch({ type: RESET, newPresent });
  }, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }];
};
