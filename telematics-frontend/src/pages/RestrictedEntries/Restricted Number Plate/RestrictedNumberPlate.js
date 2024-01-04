import React, { useEffect, useState } from 'react'
// import { Loader } from "rsuite";
import Sidebar from '../../../components/Sidebar/Sidebar'
import axios from 'axios';
import NavBar from '../../../components/navBar/NavBar';
import UseFetch from '../../../hooks/UseFetch';
import moment from 'moment';

const RestrictedNumberPlate = ({ handleOpen }) => {

    const [dashboardToggle, setDashboardToggle] = useState(false);
    const [numInput, setNumInput] = useState('');
    const { data, setData, loadData, setLoadData, fetch } = UseFetch();
    const { data : historyData, loadData : loadHistoryData, fetch: HistoryFetch } = UseFetch();

    useEffect(() => {
        fetch('/get-restricted-number-plate');
        HistoryFetch('/get-all-car-notifcation');

    }, [])

    const toggleHandle = () => {
        setDashboardToggle(!dashboardToggle);
    }


    const onSubmit = async ()=>{
        // console.log('click')
        if(numInput.length>0){
            const obj = {
                licenseNumber : numInput,
                status: 'pending'
            }
            setLoadData(true);
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/add-restricted-number-plate`, obj);
                const result = response.data;
    
                if (result.Bool) {
                    // console.log(result.data)
                    setData([ ...data, result.data]);
                    setLoadData(false)
                    setNumInput('')
                }
                else {
                    console.log('reject your request');
                    setNumInput('')
                }
    
                // console.log(result, 'result');
            } catch (e) {
                console.log(e);
                setNumInput('')
            }
        }
        else{
            console.log('Enter something');
        }
        
    }


    const onDelete = async (id)=>{
        // console.log(id, 'id')

        try{

            const filterData = data.filter(item=> item.id !== id);
            setData(filterData);
    
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/remove-restricted-number-plate/${id}`);
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
        <div className={`g-sidenav-show  bg-gray-100 ${dashboardToggle ? 'g-sidenav-pinned' : ''} `}>
            <Sidebar dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                <NavBar toggleHandle={toggleHandle} title={'Restricted Number Plate'} nestedRoute={'Restricted Entries'} backBtn={'/restricted-entries'} />
                <div className='container-fluid py-4'>
                    <div className='row' style={{ width: "100%" }}>
                        <div className='col-12'>
                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder="Enter Number Plate"
                                    value={numInput}
                                    onChange={(e) => setNumInput(e.target.value)}
                                    className="form-control"
                                />

                            </div>
                            <div className='col-12'>
                                <button disabled={!numInput.length>0} className="btn bg-gradient-primary mt-3 w-100" onClick={()=>onSubmit()}>Add number plate</button>
                            </div>


                            <div className='rectricted-col'>
                                {/* tabel starting */}
                                {
                                    data?.length>0 ?
                                    <>
                                        <div className="card mb-4">
                                        <h5 style={{ padding: '1rem' }}>Restricted Cars</h5>
                                            <div className="card-body px-0 pt-0 pb-2 scrolable">
                                                <div className="table-responsive p-0">
                                                    <table className="table align-items-center mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                    Serial No
                                                                </th>
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                    License Number
                                                                </th>
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                    
                                                                </th>
                                                                
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {   data?.map((item,index)=>{
                                                                return(
                                                                <tr key={index} style={{ height : '62px' }}>
                                                                    <td className="text-xs font-weight-bold mb-0 text-secondary">{index+1}</td>
                                                                    <td className="text-xs font-weight-bold mb-0 text-secondary">{item.licenseNumber}</td>
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
                                                            )})
                                                            }
                                                        </tbody>
                                                    </table>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="card mb-4">
                                            <h6>No Restricted Cars</h6>
                                        </div>
                                    </>
                                }
                                {/* tabel starting */}

                                {
                                    historyData?.length>0 ?
                                    <>
                                        <div className="card mb-4">
                                            <h5 style={{ padding: '1rem' }}>Notification's History</h5>
                                            <div className="card-body px-0 pt-0 pb-2 scrolable">
                                                <div className="table-responsive p-0">
                                                    <table className="table align-items-center mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                    Time
                                                                </th>
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                    License Number
                                                                </th>
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                    Image
                                                                </th>
                                                                
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                loadHistoryData ?
                                                                    loadHistoryData                                                   
                                                                :
                                                                    historyData?.map((item,index)=>{
                                                                        const updateItem = { ...item, type: 'car', title: 'Car Detected' }
                                                                        return(
                                                                            <tr key={index} onClick={()=>handleOpen(updateItem)} style={{ cursor: 'pointer' }}>
                                                                                <td className="text-xs font-weight-bold mb-0 text-secondary">{moment.utc(item.processedTime).format('MMMM Do YYYY, h:mm:ss A')}</td>
                                                                                <td className="text-xs font-weight-bold mb-0 text-secondary">{item.licenseNumber}</td>
                                                                                <td className="text-xs font-weight-bold mb-0 text-secondary">
                                                                                <img
                                                                                    id="myImg"
                                                                                    src={process.env.REACT_APP_BASE_IMAGE+'/'+item.image}
                                                                                    alt="car image"
                                                                                    width={'80'}
                                                                                    />
                                                                                </td>
                                                                            </tr>
                                                                    )})
                                                            }
                                                        </tbody>
                                                    </table>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <></>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
        
    )
}

export default RestrictedNumberPlate;