import { useEffect } from "react";

function useOnClickOutside(targetElm, handler) {
  useEffect(() => {
    const listener = (event) => {
      const elm = document.getElementById(targetElm);
      // Do nothing if clicking ref's element or descendent elements
      if (!elm || elm.contains(event.target) || event.target.id === targetElm) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [targetElm, handler]);
}

export default useOnClickOutside;
