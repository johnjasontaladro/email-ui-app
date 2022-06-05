import { useLayoutEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

function Loader() {
  const [inProp, setInProp] = useState(true);
  const nodeRef = useRef(null);

  useLayoutEffect(() => {
    window.setTimeout(() => {
      setInProp(false);
    }, 300);
  }, []);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={inProp}
      timeout={500}
      classNames="my-node"
    >
      <div className="loader" id="pageLoader" ref={nodeRef}>
        <div className="loader-inner">
          <div className="circle"></div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default Loader;
