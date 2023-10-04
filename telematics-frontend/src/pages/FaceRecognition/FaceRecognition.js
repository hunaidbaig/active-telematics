import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import FaceRecognitionNavbar from "./FaceRecognitionNavbar";
import "./FaceRecognition.css";
import ImageGrid from "../../components/imageGrid/ImageGrid";


function FaceRecognition() {
  const [dashboardToggle, setDashboardToggle] = useState(false);

  const toggleHandle = () => {
    setDashboardToggle(!dashboardToggle);
  };

  return (
    <div
      className={`g-sidenav-show  bg-gray-100 ${
        dashboardToggle ? "g-sidenav-pinned" : ""
      } `}
    >
      <Sidebar dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <FaceRecognitionNavbar toggleHandle={toggleHandle} />
        <div className="row" style={{width:"100%"}}>
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h6>Upload Your Image Here </h6>
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  className="btn bg-gradient-primary mt-3"
                />
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                  <ImageGrid />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FaceRecognition;
