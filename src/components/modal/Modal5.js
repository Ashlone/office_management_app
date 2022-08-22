import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import "./Modal.css";
import ReactDom from "react-dom";
import Modal6 from "./Modal6";

const Modal5 = ({ openEditModal, onClose }) => {
  //set states
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [openContinueEditModal, setContinueOpenEditModal] = useState(false);

  //getting staff details from local storage
  const parseData = JSON.parse(localStorage.getItem("staff"));

  if (!openEditModal) {
    return null;
  }

  //Function to click next
  const handleNext = () => {
    setContinueOpenEditModal(true);
  };

  return ReactDom.createPortal(
    <>
      <div className="modal">
        <div className="modal-wrapper">
          <div className="heading-wrapper">
            <h3>Edit Staff Member</h3>
            <AiOutlineCloseCircle color="#0D4477" onClick={onClose} />
          </div>
          <div className="form">
            <input
              placeholder={parseData.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder={parseData.lastname}
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className="dots">
              <BsDot color="#489DDA" />
              <BsDot color="#489DDA" />
            </div>
            <button onClick={handleNext}>Next</button>
            <Modal6
              name={name}
              lastname={lastname}
              openContinueEditModal={openContinueEditModal}
              onClose={() => setContinueOpenEditModal(false)}
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal5;
