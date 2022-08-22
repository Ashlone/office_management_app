import React from "react";
import LandingPage from "./screens/landingpage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import OfficeView from "./screens/officeview/OfficeView";
import NewOffice from "./screens/newoffice/NewOffice";
import EditOffice from "./screens/editoffice/EditOffice";

const App = () => {
  return (
    <div className="main-wrapper">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/officeview/:id" element={<OfficeView />} />
          <Route path="/newoffice" element={<NewOffice />} />
          <Route path="/officeedit/:officeid" element={<EditOffice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
