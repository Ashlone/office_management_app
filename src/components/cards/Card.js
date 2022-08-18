import React from "react";
import "./Card.css";
import { HiOutlineUserGroup, HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlinePhone, MdOutlineModeEditOutline } from "react-icons/md";

const Card = () => {
  return (
    <div className="card-wrapper">
      <div className="title">
        {" "}
        <h3>Specno</h3>
        <MdOutlineModeEditOutline />
      </div>

      <div className="staff-member">
        <HiOutlineUserGroup color="#484954" />
        <p>5 staff members in the office</p>
      </div>
      <hr />
      <div className="moreinfo">
        <p>More info</p>
        <IoIosArrowDown color="#0D4477" />
      </div>
    </div>
  );
};

export default Card;
