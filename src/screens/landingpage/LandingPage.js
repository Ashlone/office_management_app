import React, { useEffect, useState } from "react";
import Card from "../../components/cards/Card";
import "./LandingPage.css";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
const LandingPage = () => {
  const navigate = useNavigate();
  const [offices, setOffices] = useState([]);

  //fetching data from firestore
  useEffect(() => {
    const fetchData = async () => {
      let dataList = [];
      try {
        const querySnapshot = await getDocs(collection(db, "offices"));
        querySnapshot.forEach((doc) => {
          dataList.push({ id: doc.id, ...doc.data() });
          setOffices(dataList);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <h2 className="title">All Offices</h2>
      <div className="column">
        {offices.map((office) => (
          <Card key={office.id} office={office} />
        ))}
      </div>
      <div className="floating-button">
        <IoIosAddCircle
          onClick={() => navigate("/newoffice")}
          size="60px"
          color="#0D4477"
        />
      </div>
    </div>
  );
};

export default LandingPage;
