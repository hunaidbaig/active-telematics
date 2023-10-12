import React, { useState } from "react";
import UploadsNavbar from "./UploadsNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";

function Uploads() {
  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [videoVisible, setVideoVisible] = useState(false);

  const toggleHandle = () => {
    setDashboardToggle(!dashboardToggle);
  };

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setVideoVisible(selectedValue !== "");
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setVideoURL(objectURL);
    }
  };

  return (
    <div
      className={`g-sidenav-show  bg-gray-100 ${
        dashboardToggle ? "g-sidenav-pinned" : ""
      } `}
    >
      <Sidebar dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
      <main className='main-content position-relative max-height-vh-100 h-100 border-radius-lg '>
        <UploadsNavbar toggleHandle={toggleHandle} />
        <div className='container-fluid py-4'>
          <div className='row' style={{ width: "100%" }}>
            <div className='col-12'>
              <div className='card mb-4'>
                <div className='card-header'>
                  <label style={{fontSize:"1rem"}}>Input Type:</label>
                  <select value={selectedOption} onChange={handleOptionChange} className="form-control">
                    <option value=''>Select an option</option>
                    <option value='face video'>Face video</option>
                    <option value='License Plate Video'>
                      License Plate Video
                    </option>
                  </select>

                  {videoVisible && (
                    <div className='card-header pb-0'>
                      <label style={{fontSize:"1rem"}}>Upload Video</label>
                      <input
                        type='file'
                        accept='video/*'
                        onChange={handleVideoUpload}
                        className='btn bg-gradient-primary mt-3'
                      />
                    </div>
                  )}

                  {videoURL && (
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                      <video controls >
                        <source src={videoURL} type='video/mp4' />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Uploads;
