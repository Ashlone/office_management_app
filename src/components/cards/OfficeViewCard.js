import React, { useState } from "react";
import "./Card.css";
import { HiOutlineUserGroup, HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlinePhone, MdOutlineModeEditOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const OfficeViewCard = ({ singleDoc }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ borderLeftColor: `${singleDoc?.colorpicker}` }}
      className="card-wrapper"
    >
      <div className="title">
        <h3>{singleDoc?.officename}</h3>
        <MdOutlineModeEditOutline
          onClick={() => navigate(`/officeedit/${params.id}`)}
        />
      </div>

      <div className="staff-member">
        <HiOutlineUserGroup color="#484954" />
        <p>{singleDoc?.maximumcapacity}</p>
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
            <p>{singleDoc?.phonenumber}</p>
          </div>
          <div className="staff-member">
            <IoMailOutline color="#484954" />
            <p>{singleDoc?.emailaddress}</p>
          </div>
          <div className="staff-member">
            <HiOutlineUserGroup color="#484954" />
            <p>Office Capacity: {singleDoc?.maximumcapacity}</p>
          </div>

          <div className="staff-member">
            <HiOutlineLocationMarker color="#484954" />
            <p>{singleDoc?.physicaladdress}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default OfficeViewCard;
