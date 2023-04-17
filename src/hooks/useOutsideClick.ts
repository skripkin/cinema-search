import { useCallback, useEffect } from "react";

const useHandleOutsideClick = (ref: any, state: any, stateFunc: () => void) => {
  const detectOutside = useCallback(
    (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        stateFunc();
      }
    },
    [ref, stateFunc]
  );

  useEffect(() => {
    if (state) {
      document.addEventListener("mousedown", detectOutside);
    }
    return () => {
      document.removeEventListener("mousedown", detectOutside);
    };
  }, [detectOutside, state]);
};

export default useHandleOutsideClick;
