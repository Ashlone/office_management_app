import React, { useState } from "react";
import "./Card.css";
import { HiOutlineUserGroup, HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlinePhone, MdOutlineModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Card = ({ office }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ borderLeftColor: `${office.colorpicker}` }}
      className="card-wrapper"
    >
      <div className="title">
        <h3>{office.officename}</h3>
        <MdOutlineModeEditOutline
          onClick={() => navigate(`/officeview/${office.id}`)}
        />
      </div>

      <div className="staff-member">
        <HiOutlineUserGroup color="#484954" />
        <p>{office.maximumcapacity}</p>
      </div>
      <hr className="line-divider" />
      <div className="moreinfo">
        <p>More info</p>
        {!open ? (
          <IoIosArrowDown color="#0D4477" onClick={() => setOpen(true)} />
        ) : (
          <IoIosArrowUp color="#0D4477" onClick={() => setOpen(false)} />
        )}
      </div>

      {open && (
        <>
          <div className="staff-member">
            <MdOutlinePhone color="#484954" />
            <p>{office.phonenumber}</p>
          </div>
          <div className="staff-member">
            <IoMailOutline color="#484954" />
            <p>{office.emailaddress}</p>
          </div>
          <div className="staff-member">
            <HiOutlineUserGroup color="#484954" />
            <p>Office Capacity: {office.maximumcapacity}</p>
          </div>

          <div className="staff-member">
            <HiOutlineLocationMarker color="#484954" />
            <p>{office.physicaladdress}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
