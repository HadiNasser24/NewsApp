import { useRef } from 'react';

const usePrerender = (func: Function) => {
  const willMount = useRef(true);
  if (willMount.current) {
    func();
  }
  willMount.current = false;
};

export { usePrerender };
