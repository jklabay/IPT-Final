import React from "react";
import ReactDOM from "react-dom";

const Modal = (props: any) => {
  const Backdrop = (props: any) => {
    return (
      <div
        onClick={props.onClick}
        className="bg-[rgba(0,0,0,0.50)] fixed z-5 h-[100vh] w-full"
      />
    );
  };

  const ModalOverlay = (props: any) => {
    return (
      <div
        className={`${props.className} fixed z-10 left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] rounded h-auto p-6 min-w-[35rem]`}
      >
        {props.children}
      </div>
    );
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        document.getElementById("overlay")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={props.className}>
          {props.children}
        </ModalOverlay>,
        document.getElementById("overlay")!
      )}
    </React.Fragment>
  );
};

export default Modal;