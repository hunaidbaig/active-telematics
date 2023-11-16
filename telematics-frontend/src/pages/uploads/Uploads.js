import React, { useState, useRef, useEffect } from "react";
import { toast } from 'react-toastify'
import Sidebar from "../../components/Sidebar/Sidebar";
import { Loader } from "rsuite";
import NavBar from "../../components/navBar/NavBar";
import { api, backendApi } from "../../api/Config";

function Uploads() {
  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [videoURL, setVideoURL] = useState(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const fileInputRef = useRef(null); 
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false)
  // const [status, setStatus] = useState(false);
  const [uploadData, setUploadData] = useState(null);
  const [reRender, setRerender] = useState(false);



  useEffect(()=>{
    (async()=>{

      const {data} = await api.get('/get-upload-files',{
        headers: 'GET'
      })

      setUploadData([...data.data])
      // console.log(data, 'data')

    })()
  },[reRender])


  const toggleHandle = () => {
    setDashboardToggle(!dashboardToggle);
  };

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setVideoURL('');
    setShow(false)
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

    // console.log('check', file)
    setShow(true);
    setLoader(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", selectedOption);

    try {
      const response = await backendApi.post(
        "/upload_video/",
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
      setRerender(!reRender);
      // setStatus('Your video is in process!')
      toast.success(' Your video is in process!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
      // console.log("Response:", response);

    } catch (error) {
      setSelectedOption('')
      // setStatus('Your video cannot be  processed!');
      toast.error(' Your video cannot be  processed!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
      console.error("Error uploading file:", error);
    }
  }

  return (
    <>
    <div
      className={`g-sidenav-show  bg-gray-100 ${
        dashboardToggle ? "g-sidenav-pinned" : ""
      } `}
    >
    <Sidebar dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />

      <main className='main-content position-relative max-height-vh-100 h-100 border-radius-lg '>
        <NavBar toggleHandle={toggleHandle} title={'Uploads'} temp={true} />
        <div className='container-fluid py-4'>
          <div className='row' style={{ width: "100%" }}>
            <div className='col-12'>

              {/* tabel starting */}
              <h5 style={{ padding: '1rem' }}>File uploads</h5>
              <div className="card mb-4">
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0 scrolable">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Date
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Time 
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            video
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          uploadData && 
                            uploadData.map((item, index)=>(
                              <tr key={index}>
                                <td className="text-xs font-weight-bold mb-0 text-secondary">{item.input_date.split('T')[0]}</td>
                                <td className="text-xs font-weight-bold mb-0 text-secondary">
                                  {item.input_timestamp.replaceAll('-', ':')}
                                </td>
                                <td className="text-xs font-weight-bold mb-0 text-secondary">
                                  {item.video_path}
                                </td>
                                <td className={`text-xs font-weight-bold mb-0 text-secondary ${item.status==='Processing' ? 'red-class' : 'green-class' }`}>
                                  
                                  {item.status}
                                </td>
                              </tr> 
                            ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* tabel starting */}

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
                    <option value='face'>Face video</option>
                    <option value='car'>License Plate Video</option>
                    <option value='both'>License Plate & Face Video</option>
                  </select>

                  {videoVisible && (
                    <div className='card-header pb-0'>
                      <label style={{ fontSize: "1rem" }}>Upload Video</label>
                      <input
                        type='file'
                        accept='*/*'
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
                        <button style={{ display: 'flex', alignItems: 'center', gap: '5px' }} className='btn bg-gradient-primary mt-4' disabled={loader} onClick={()=> procesedHandle()}> {loader ? <><Loader /> <span>Processing...</span> </>   : 'Process Video' }</button>
                      }
                    </div>
                  ) : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <h4 style={{ marginTop: '2rem'}}>
                          {/* { status } */}
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
    </>
  );
}

export default Uploads;
