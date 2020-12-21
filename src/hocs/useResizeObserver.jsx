import { useRef, useMemo, useLayoutEffect, useState, useCallback } from "react";

const useResizeObserver = () => {
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [node, setNode] = useState(null);

  const observer = useRef(null);

  const disconnect = useCallback(() => {
    const { current } = observer;
    current && current.disconnect();
  }, []);

  const observe = useCallback(() => {
    observer.current = new ResizeObserver(
      ([
        {
          contentRect: { width, height },
        },
      ]) => setSize({ width, height })
    );
    node && observer.current.observe(node);
  }, [node]);

  useLayoutEffect(() => {
    observe();
    return () => disconnect();
  }, [observe, disconnect]);

  return useMemo(() => [setNode, size], [setNode, size]);
};

export default useResizeObserver;
