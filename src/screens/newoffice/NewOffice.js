import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./NewOffice.css";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const NewOffice = () => {
  const navigate = useNavigate();

  //setStates
  const [officename, setOfficeName] = useState("");
  const [physicaladdress, setPhysicalAddess] = useState("");
  const [emailaddress, setEmailAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [maximumcapacity, setMaximumCapacity] = useState("");
  const [loading, setLoading] = useState(false);

  //Getting the value of the color and keeping the value
  const colors = [
    "#FFBE0B",
    "#FF9B71",
    "#FB5607",
    " #97512C",
    " #DBBADD",
    "#FF006E",
    "#A9F0D1",
    "#00B402",
    "#489DDA",
    "#0072E8",
    "#8338EC",
  ];

  const [colorpicker, setColorPicker] = useState("");
  //const colorRef = useRef();
  const handleColorPicker = (color) => {
    setColorPicker(() => {
      return color;
    });
  };

  //Create Office
  const createOffice = async () => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "offices"), {
        officename,
        physicaladdress,
        emailaddress,
        phonenumber,
        maximumcapacity,
        colorpicker,
      });
      console.log("Document written with ID: ", docRef.id);
      alert("You have created an office");
      setLoading(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="title-wrapper">
        <AiOutlineArrowLeft onClick={() => navigate("/")} />
        <h2>New Office</h2>
        <span>hidden</span>
        {/**This element will be hidden */}
      </div>
      <div className="form">
        <input
          placeholder="Office Name"
          value={officename}
          onChange={(e) => setOfficeName(e.target.value)}
        />
        <input
          placeholder="Physical Address"
          value={physicaladdress}
          onChange={(e) => setPhysicalAddess(e.target.value)}
        />
        <input
          placeholder="Email Address"
          value={emailaddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <input
          placeholder="Phone Number"
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          placeholder="Maximum Capacity"
          value={maximumcapacity}
          onChange={(e) => setMaximumCapacity(e.target.value)}
        />
      </div>
      <div className="color-title">
        <h3>Office Color</h3>
      </div>
      <div className="color-picker">
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              background: `${color}`,
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `${colorpicker === color ? `4px solid #475569` : `none`}`,
            }}
            onClick={() => handleColorPicker(color, index)}
          ></div>
        ))}
      </div>
      <button onClick={createOffice} className="button">
        {!loading ? "Add Office" : "loading..."}
      </button>
    </div>
  );
};

export default NewOffice;
