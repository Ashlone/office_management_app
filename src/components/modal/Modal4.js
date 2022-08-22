import React from "react";
import "./Modal4.css";
import ReactDom from "react-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Modal4 = ({ openDeleteModal }) => {
  if (!openDeleteModal) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className="modal">
        <div className="modal-wrapper">
          <div className="inner-wrapper">
            <div className="heading-wrapper">
              <AiOutlineArrowLeft size="25px" />
              <h4>Are You Sure You Want To Delete Staff Member?</h4>
            </div>
            <div className="delete-button">
              <button>KEEP OFFICE</button>
            </div>
            <div className="keep-office-button">
              <button>DELETE OFFICE</button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal4;
