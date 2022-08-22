import React, { useState } from "react";
import "./Modal3.css";
import ReactDom from "react-dom";
import Modal4 from "./Modal4";
import Modal5 from "./Modal5";

const Modal3 = ({ openEditDeleteModal, setOpenEditDeleteModal }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  if (!openEditDeleteModal) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className="modal" onClick={() => setOpenEditDeleteModal(false)}>
        <div className="modal-wrapper">
          <div className="inner-wrapper">
            <div className="edit-button">
              <button onClick={() => setOpenEditModal(true)}>
                Edit Staff Member
              </button>
            </div>
            <div className="delete-button">
              <button onClick={() => setOpenDeleteModal(true)}>
                Delete Staff Member
              </button>
            </div>
          </div>
        </div>
        <Modal4
          setOpenEditDeleteModal={setOpenEditDeleteModal}
          openDeleteModal={openDeleteModal}
        />
        <Modal5
          openEditModal={openEditModal}
          onClose={() => setOpenEditModal(false)}
        />
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal3;
