import React from "react";
import Card from "../../components/cards/Card";
import "./LandingPage.css";
import { IoIosAddCircle } from "react-icons/io";

const LandingPage = () => {
  return (
    <div className="wrapper">
      <h2 className="title">All Offices</h2>
      <div className="column">
        <Card />
        <Card />
        <Card />
      </div>
      <div className="floating-button">
        <IoIosAddCircle size="60px" color="#0D4477" />
      </div>
    </div>
  );
};

export default LandingPage;
