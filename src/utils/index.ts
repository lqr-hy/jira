// 判断零的情况
import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === "0" ? false : !value);

// 在函数里面别污染传入的变量
export const clearObject = (object: object) => {
  const result = { ...object };
  //找到对象的key
  Object.keys(result).forEach((key) => {
    // 拿到值
    // @ts-ignore
    const value = result[key];
    // 判断值是否存在
    if (isFalsy(value)) {
      // 如果值为空
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

// useMount() 只执行一次
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, [callback]);
};

// userDebounce 防抖
export const useDebounce = (value: any, delay?: number) => {
  // 设置一个值控制value
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 当value变化的时候设置一个定时器
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceValue;
};
