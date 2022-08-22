import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import "./OfficeView.css";
import Modal from "../../components/modal/Modal";
import Modal3 from "../../components/modal/Modal3";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import OfficeViewCard from "../../components/cards/OfficeViewCard";
const OfficeView = () => {
  //set states
  const [showModal, setShowModal] = useState(false);
  const [openEditDeleteModal, setOpenEditDeleteModal] = useState(false);
  const [singleDoc, setSingleDoc] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [staff, setStaff] = useState([]);
  const [query, setQuery] = useState("");
  const fetchSingleDoc = async () => {
    try {
      //Getting a single document from firebase
      const docRef = doc(db, "offices", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSingleDoc(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Fetching staff members
  const fetchSubCollection = async () => {
    const list = [];
    try {
      //Getting  subcollection from document
      const querySnapshot = await getDocs(
        collection(db, "offices", `${id}`, "staff")
      );
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
        setStaff(list);
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Saving staff member to local storage
  const getStaffMember = async (member) => {
    if (localStorage.getItem("staff") !== null) {
      localStorage.removeItem("staff");

      const stringify = JSON.stringify(member);
      const data = localStorage.setItem("staff", stringify);
    }
    setOpenEditDeleteModal(true);
  };

  useEffect(() => {
    fetchSingleDoc();
  }, []);

  useEffect(() => {
    fetchSubCollection();
  }, []);

  return (
    <div>
      <div className="title-wrapper">
        <AiOutlineArrowLeft onClick={() => navigate("/")} />
        <h2>Office</h2>
        <span>hidden</span>
        {/**This element will be hidden */}
      </div>
      <OfficeViewCard singleDoc={singleDoc} />
      <div className="search-input">
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
        <BiSearch />
      </div>
      <div className="staff-members-heading">
        <h3>Staff Members In Office</h3>
        <span>{staff.length}</span>
      </div>
      {staff
        .filter((user) => user.name.includes(query))
        .map((member) => (
          <div key={member.id} className="staff-members-list">
            <img src={`${member.selectedAvatar}`} alt="avatars" />
            <h6>{`${member.name}` + "  " + `${member.lastname}`} </h6>
            <BiDotsVerticalRounded onClick={() => getStaffMember(member)} />
          </div>
        ))}

      <div className="floating-button">
        <IoIosAddCircle
          size="60px"
          color="#0D4477"
          onClick={() => setShowModal(true)}
        />
      </div>
      <Modal showModal={showModal} onClose={() => setShowModal(false)} />
      <Modal3
        openEditDeleteModal={openEditDeleteModal}
        setOpenEditDeleteModal={setOpenEditDeleteModal}
      />
    </div>
  );
};

export default OfficeView;
