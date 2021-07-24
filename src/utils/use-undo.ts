import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  // // 历史操作合集
  // const [past, setPast] = useState<T[]>([]);
  //
  // // 现在的值
  // const [present, setPresent] = useState(initialPresent);
  //
  // // 未来的值
  // const [future, setFuture] = useState<T[]>([]);

  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });
  // 判断是否可以undo
  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  // 返回上一次操作
  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, future, present } = currentState;
      // 如果没有就不能返回
      if (past.length === 0) return currentState;
      // 上一次的值
      const previous = past[past.length - 1];
      // 新的past数组
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      // 是否能前进
      if (future.length === 0) return currentState;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        future: newFuture,
        past: [...past, present],
        present: next,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present } = currentState;
      if (newPresent === present) return currentState;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState({
      past: [],
      present: newPresent,
      future: [],
    });
  }, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }];
};
