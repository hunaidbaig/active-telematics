import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar';
import NavBar from '../../../components/navBar/NavBar';
import { api } from '../../../api/Config';
import axios from 'axios';
import moment from 'moment';
import UseFetch from '../../../hooks/UseFetch';

const RestrictedFaces = ({ handleOpen }) => {
    const [dashboardToggle, setDashboardToggle] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [file, setFile] = useState(null);
    const [reRender, setRerender] = useState(null);
    const { data : uploadData, setData : setUploadData, fetch } = UseFetch();
    const { data : notifcationData, fetch: fetchNotifications } = UseFetch();


    useEffect(()=>{
        fetch('/get-restricted-images');
        fetchNotifications('/get-all-face-notifcation')
      }, [reRender])

      useEffect(()=>{
        onUpload()
      }, [file])

    const toggleHandle = () => {
        setDashboardToggle(!dashboardToggle);
    };

    const openModal = (imageSrc, altText) => {
        console.log(imageSrc, altText)
        setCurrentImage(imageSrc);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const onFileChange = async (event) => {
        setFile(event.target.files[0]);
        // setLoading(true)
        console.log(event.target.files[0])
    };

    const onUpload = async () => {
        console.log('file', file)
        if (!file) {
          // console.log("No file selected");
        //   setLoading(null)
          return;
        }
    
        console.log('file', file)
    
        const formData = new FormData();
        formData.append("file", file);
    
        try {
          const response = await axios.post(
            "http://13.235.82.14:8000/restricted_face/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
    
          console.log(file);
          console.log("Response:", response);
          setRerender('chalo na')
        //   setUploadData([...uploadData, response.data.similar_images]);
          
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };

    const onDelete = async (id)=>{
        console.log(id, 'id')
        try{

            const filterData = uploadData.filter(item=> item.id !== id);
            setUploadData(filterData);
    
            const response = await api.delete(`/remove-restricted-image/${id}`);
            const result = response.data;
    
            if(result.Bool){
                console.log(result.message);
            }
            else{
                console.log('network error')
            }
        }
        catch(e){
            console.log(e);
        }

    }

  return (
    <>
        {
            modalVisible &&
                <div id="myModal" className="my-modal" >
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img className="modal-content" id="img01" style={{
                    height:"800px",
                    objectFit:"contain"
                    }} src= {currentImage} alt={'restricted face'}
                    />
                </div>
        }

        <div
            className={`g-sidenav-show  bg-gray-100 ${
                dashboardToggle ? "g-sidenav-pinned" : ""
            } `}
        >
        <Sidebar dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />

        <main className='main-content position-relative max-height-vh-100 h-100 border-radius-lg '>
            <NavBar toggleHandle={toggleHandle} title={'Restricted Faces'} nestedRoute={'Restricted Entries'} backBtn={'/restricted-entries'} />
            <div className='container-fluid py-4'>
            <div className='row' style={{ width: "100%" }}>
                <div className='col-12'>
                    <div className='rectricted-col'>
                        {/* tabel restricted starting */}
                        <div className="card mb-4">
                            <h5 style={{ padding: '1rem' }}>Restricted Faces</h5>
                            <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive p-0 scrolable">
                                <table className="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Serial No:
                                    </th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Time 
                                    </th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Image
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    uploadData && 
                                        uploadData.map((item, index)=>(
                                        <tr key={index}>
                                            <td className="text-xs font-weight-bold mb-0 text-secondary">{index+1}</td>
                                            <td className="text-xs font-weight-bold mb-0 text-secondary">
                                                {moment.utc(item.processed_time).format('MMMM Do YYYY, h:mm:ss A')}
                                            </td>
                                            <td className="text-xs font-weight-bold mb-0 text-secondary">
                                                <div className="column" key={index}>
                                                    <img
                                                        src={process.env.REACT_APP_BASE_IMAGE+'/'+item.name}
                                                        alt={`restricted face`}
                                                        style={{ width: "50%" }}
                                                        onClick={() => {
                                                            openModal(process.env.REACT_APP_BASE_IMAGE+'/'+item.name, 'Snow')
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="text-xs font-weight-bold mb-0 text-secondary">
                                                <button className='bg-gradient-primary'
                                                    style={{
                                                        padding : '0.4rem',
                                                        borderRadius: '10px',
                                                        color: '#ffffff'
                                                    }}
                                                onClick={()=> onDelete(item.id)}
                                                >
                                                    Delete me
                                                </button>
                                            </td>
                                        </tr> 
                                        ))
                                    }
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                        {/* tabel restricted ending */}
                        {/* =============================== */}

                        {/* tabel restricted starting */}
                        <div className="card mb-4">
                            <h5 style={{ padding: '1rem' }}>Notification's History</h5>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                    Serial
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                    Time
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                    Image
                                                </th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                !notifcationData ?
                                                    <></>                                                   
                                                :
                                                notifcationData?.map((item,index)=>{
                                                    const updateItem = { ...item, type: 'face', title: 'Face Detected' }
                                                    return(
                                                        <tr key={index} onClick={()=>handleOpen(updateItem)} style={{ cursor: 'pointer', height:'67px' }}>
                                                            <td className="text-xs font-weight-bold mb-0 text-secondary">{index+1}</td>
                                                            <td className="text-xs font-weight-bold mb-0 text-secondary">{moment.utc(item.processed_time).format('MMMM Do YYYY, h:mm:ss A')}</td>
                                                            <td className="text-xs font-weight-bold mb-0 text-secondary">
                                                                <div className="column" key={index}>
                                                                    <img
                                                                        src={process.env.REACT_APP_BASE_IMAGE+'/'+item.name}
                                                                        alt={`face detected`}
                                                                        style={{ width: "50%" }}
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                        </div>
                        {/* tabel history eding */}
                    </div>

                    <div className='card mb-4'>
                    <div className='card-header pb-0'>
                        <h6>Upload Your Image Here </h6>
                        <input
                            type='file'
                            id='img'
                            name='img'
                            onChange={onFileChange}
                            accept='image/*'
                            className='btn bg-gradient-primary mt-3'
                        />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </main>
        </div>
    </>
  )
}

export default RestrictedFaces