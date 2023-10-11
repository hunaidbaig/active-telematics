import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import FaceRecognitionNavbar from "./FaceRecognitionNavbar";
import "./FaceRecognition.css";
import ImageGrid from "../../components/imageGrid/ImageGrid";
import axios from "axios";


function FaceRecognition() {
  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(null);

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
        // onUpload();
    };

  const toggleHandle = () => {
    setDashboardToggle(!dashboardToggle);
  };

  useEffect(()=>{
    onUpload();
  },[file])


  const onUpload = async () => {

    if (!file) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
    const response = await axios.post('http://192.168.4.52:8000/find_face/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

      console.log(file);
      console.log('Response:', response.data.similar_images);

      setImages(response.data.similar_images)

    } catch (error) {
        console.error('Error uploading file:', error);
    }
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
                  onChange={onFileChange}
                  accept="image/*"
                  className="btn bg-gradient-primary mt-3"
                />
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                  <ImageGrid images={images} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FaceRecognition;
