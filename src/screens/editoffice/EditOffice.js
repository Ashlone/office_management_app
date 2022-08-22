import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./EditOffice.css";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const EditOffice = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { officeid } = params;
  //setStates
  const [officename, setOfficeName] = useState("");
  const [physicaladdress, setPhysicalAddess] = useState("");
  const [emailaddress, setEmailAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [maximumcapacity, setMaximumCapacity] = useState("");
  const [data, setData] = useState();

  const docRef = doc(db, "offices", `${officeid}`);
  const fetchSingleDoc = async () => {
    try {
      //Getting a single document from firebase

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSingleDoc();
  }, []);
  //Getting the value of the color and keeping the value
  const colors = [
    "#FFBE0B",
    "#FF9B71",
    "#FB5607",
    "#97512C",
    "#DBBADD",
    "#FF006E",
    "#A9F0D1",
    "#00B402",
    "#489DDA",
    "#0072E8",
    "#8338EC",
  ];

  //Selecting Color
  const handleColorPicker = (color) => {
    setData((colorpicker) => {
      return {
        ...colorpicker,
        colorpicker: color,
      };
    });
  };

  //Update Document
  const updateOffice = async () => {
    try {
      const updateDocument = await updateDoc(docRef, {
        officename,
        physicaladdress,
        emailaddress,
        phonenumber,
        maximumcapacity,
        colorpicker: data.colorpicker,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //Delete Office
  const deleteOffice = async () => {
    try {
      await deleteDoc(doc(db, "offices", `${officeid}`));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="title-wrapper">
        <AiOutlineArrowLeft onClick={() => navigate("/")} />
        <h2>Edit Office</h2>
        <span>hidden</span>
        {/**This element will be hidden */}
      </div>
      <div className="form">
        <input
          placeholder={data?.officename}
          value={officename}
          onChange={(e) => setOfficeName(e.target.value)}
        />
        <input
          placeholder={data?.physicaladdress}
          value={physicaladdress}
          onChange={(e) => setPhysicalAddess(e.target.value)}
        />
        <input
          placeholder={data?.emailaddress}
          value={emailaddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <input
          placeholder={data?.phonenumber}
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          placeholder={data?.maximumcapacity}
          value={maximumcapacity}
          onChange={(e) => setMaximumCapacity(e.target.value)}
        />
      </div>
      <div className="color-title">
        <h3>Office Color</h3>
      </div>
      <div className="color-picker">
        {colors.map((color) => (
          <div
            key={color}
            style={{
              border: `${
                color === data?.colorpicker ? `4px solid #475569` : `none`
              }`,
              background: `${color}`,
              width: "36px",
              height: "36px",
              borderRadius: "50%",
            }}
            onClick={() => handleColorPicker(color)}
          ></div>
        ))}
      </div>
      <button onClick={updateOffice} className="update-button">
        Update Office
      </button>
      <button className="delete-button" onClick={deleteOffice}>
        Delete Office
      </button>
    </div>
  );
};

export default EditOffice;
