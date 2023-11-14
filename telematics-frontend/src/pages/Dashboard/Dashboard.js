import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import DashboardTotalCard from '../../components/dashboardTotalCard/DashboardTotalCard';
import DashboardHeroSection from '../../components/dashboardHeroSection/DashboardHeroSection';
import axios from 'axios';
import NavBar from '../../components/navBar/NavBar';
import { toast } from 'react-toastify';
import NotificationCard from '../../components/notificationCard/NotificationCard';
import CarModal from '../../components/Modal/CarModal';

const Dashboard = ({ handleOpen }) => {

  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [data, setData] = useState([]);
  const [restrictedData, setRestrictedData] = useState([]);
  const [loadData, setLoadData] = useState(null);
  const [count, setCount] = useState(0);
  // const [open, setOpen] = React.useState(false);
  // const [carData, setCarData] = React.useState(null);



  // const handleOpen = (car) => {
  //   console.log(car)
  //   setOpen(true)
  //   setCarData({...car})
  // };
  // const handleClose = () => {
  //   setOpen(false);
  //   setCarData(null)
  // };

  useEffect(()=>{
    const fetch = async ()=>{
      setLoadData(true);
      try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-unique-license-plate`);
        const result =  response.data;
  
        if(result.Bool){
          setData(result.data);
          setLoadData(false)
          // setCount(prev=> prev+1);
        }
        else{
          console.log('reject your request');
        }
  
        // console.log(result);
      }catch(e){
        console.log(e);
      }

    }

    const fetchRestricted = async ()=>{
      setLoadData(true);
      try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-restricted-number-plate`);
        const result =  response.data;
  
        if(result.Bool){
          setRestrictedData(result.data);
          setLoadData(false)
          setCount(prev=> prev+1);
        }
        else{
          console.log('reject your request');
        }
  
        // console.log(result);
      }catch(e){
        console.log(e);
      }

    }

    fetch();
    fetchRestricted();
    // toast.dismiss();


  },[])

  const onSubmit = async (id, numInput, status)=>{
    console.log('click')
        const obj = {
            id: id,
            licenseNumber : numInput,
            status: status
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/update-restricted-number-plate`, obj);
            const result = response.data;

            if (result.Bool) {
                // console.log(result.data)
                setRestrictedData([ ...restrictedData, result.data]);
            }
            else {
                console.log('reject your request');
            }

            // console.log(result, 'result');
        } catch (e) {
            console.log(e);
        }
    
}

  useEffect(()=>{
    if(data.length>0 && restrictedData.length>0){
      let arr = [];
      const result = data.reduce((matches, item) => {
        const match = restrictedData.find((restrictedItem) => item.license_number.toLowerCase() === restrictedItem.licenseNumber.toLowerCase());
        if (match) {
          matches.push(item);
          arr.push(match)
        }
        return matches;
        } , []);

      if(result.length>0){

        result.map((item,index)=>{
          // console.log(arr[index].status);
          if(arr[index].status === 'pending'){
            toast(<NotificationCard car={item} />, {
              position: "bottom-left",
              autoClose: false, // Disable auto close
              closeOnClick: false, // Disable built-in close on click
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              className: 'notification-card',
              // style:{
              //   width : '600px',
              // },
              onClick :()=>{
                console.log('hello')
                handleOpen(item);
              }
              
            });
            
             onSubmit(arr[index].id, item.license_number, 'delivered');
          }
        })
      }

      // console.log(result, 'result');
      // console.log(data, restrictedData)
    }
  },[count===2])




  const toggleHandle = ()=>{
    setDashboardToggle(!dashboardToggle);
  }





  return (
    <>
        {/* {
          open && <CarModal handleClose={handleClose} open={open} car={carData} />
        } */}
        <div className={`g-sidenav-show  bg-gray-100 ${dashboardToggle ?'g-sidenav-pinned' : ''} ` }>

            <Sidebar dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                <NavBar toggleHandle={toggleHandle} title={'Dashboard'} />
                <DashboardTotalCard data={data} />
                <DashboardHeroSection data={data} loadData={loadData} />
            </main>
        </div>
    </>
  )
}

export default Dashboard;
