import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar';
import NavBar from '../../../components/navBar/NavBar';
import { api } from '../../../api/Config';

const RestrictedFaces = () => {
    const [dashboardToggle, setDashboardToggle] = useState(false);
    const [uploadData, setUploadData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    useEffect(()=>{
    
        (async()=>{
    
          const {data} = await api.get('/get-restricted-images',{
            headers: 'GET'
          })
    
          setUploadData([...data.data])
          // console.log(data, 'data')
    
        })()
      },[])

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

    const onFileChange = (event) => {
        // setFile(event.target.files[0]);
        // setLoading(true)
        console.log(event.target.files[0])
    };


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

                    {/* tabel starting */}
                    <h5 style={{ padding: '1rem' }}>Restricted Faces</h5>
                    <div className="card mb-4">
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
                                        {item.processed_time}
                                        </td>
                                        <td className="text-xs font-weight-bold mb-0 text-secondary">
                                            <div className="column" key={index}>
                                                <img
                                                    src={process.env.REACT_APP_BASE_IMAGE+'/'+item.name}
                                                    alt={`${index}`}
                                                    style={{ width: "50%" }}
                                                    onClick={() => {
                                                        openModal(process.env.REACT_APP_BASE_IMAGE+'/'+item.name, 'Snow')
                                                    }}
                                                />
                                            </div>
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