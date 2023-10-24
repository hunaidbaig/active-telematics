import React, { useState, useRef } from "react";
import UploadsNavbar from "./UploadsNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { Loader } from "rsuite";

function Uploads() {
  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [videoURL, setVideoURL] = useState(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const fileInputRef = useRef(null); 
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(null);
  const [loader, setLoader] = useState(false)


  const toggleHandle = () => {
    setDashboardToggle(!dashboardToggle);
  };

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setVideoURL('');
    setShow(false)
    setStatus(null);
    setVideoVisible(selectedValue !== "");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleVideoUpload = (e) => {
    const currentfile = e.target.files[0];
    setFile(e.target.files[0])
    setShow(true)
    if (currentfile) {
      const objectURL = URL.createObjectURL(currentfile);
      setVideoURL(objectURL);
    }
  };

  const procesedHandle = async ()=>{
    if (!file) {
      console.log("No file selected");
      return;
    }

    console.log('check', file)
    setShow(true);
    setLoader(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://13.235.82.14:8000/upload_video/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setShow(false);
      setLoader(false);
      setSelectedOption('');
      fileInputRef.current.value = null;
      setStatus('Your video successfully processed!')
      console.log("Response:", response);

    } catch (error) {
      setSelectedOption('')
      setStatus('Your video cannot be  processed!')
      console.error("Error uploading file:", error);
    }
  }

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
                  <label style={{ fontSize: "1rem" }}>Input Type:</label>
                  <select
                    value={selectedOption}
                    onChange={handleOptionChange}
                    className="form-control bg-gradient-primary"
                    style={{
                      color: "white",
                      marginTop: '0.5rem'
                    }}
                  >
                    <option value=''>Select an option</option>
                    <option value='face video'>Face video</option>
                    <option value='License Plate Video'>
                      License Plate Video
                    </option>
                  </select>

                  {videoVisible && (
                    <div className='card-header pb-0'>
                      <label style={{ fontSize: "1rem" }}>Upload Video</label>
                      <input
                        type='file'
                        accept='video/*'
                        ref={fileInputRef}
                        onChange={handleVideoUpload}
                        className='btn bg-gradient-primary mt-3'
                      />
                    </div>
                  )}

                  {show ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                      <video src={videoURL} style={{ height: '65vh' }} controls width="100%">
                        {/* <source src={videoURL} type='video/mp4' /> */}
                      </video>
                      {
                        <button style={{ display: 'flex', alignItems: 'center', gap: '5px' }} className='btn bg-gradient-primary mt-4' disabled={loader} onClick={procesedHandle}> {loader ? <><Loader /> <span>Processing...</span> </>   : 'Process Video' }</button>
                      }
                    </div>
                  ) : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <h4 style={{ marginTop: '2rem'}}>
                          {status}
                        </h4>
                      </div>
                  
                  }
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
