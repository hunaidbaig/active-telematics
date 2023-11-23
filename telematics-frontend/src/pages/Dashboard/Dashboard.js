import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import DashboardTotalCard from '../../components/dashboardTotalCard/DashboardTotalCard';
import DashboardHeroSection from '../../components/dashboardHeroSection/DashboardHeroSection';
import NavBar from '../../components/navBar/NavBar';
import { toast } from 'react-toastify';
import NotificationCard from '../../components/notificationCard/NotificationCard';
import { api } from '../../api/Config';


const Dashboard = ({ handleOpen }) => {

  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [data, setData] = useState([]);
  const [restrictedData, setRestrictedData] = useState([]);
  const [loadData, setLoadData] = useState(null);
  const [count, setCount] = useState(0);
  

  useEffect(()=>{
    const fetch = async ()=>{
      setLoadData(true);
      try{
        const response = await api.get(`/get-unique-license-plate`);
        const result =  response.data;
  
        if(result.Bool){
          setData(result.data);
          setLoadData(false)
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
        const response = await api.get(`/get-restricted-number-plate`);
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

  const onSubmit = async (path, obj)=>{
    console.log('click', obj)
      
      try {
        const response = await api.post(path, obj);
        const result = response.data;

        if (result.Bool) {
            console.log(result.data)
            // setRestrictedData([ ...restrictedData, result.data]);
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
              onClick :()=>{
                console.log('hello')
                handleOpen(item);
              }
              
            });

            const obj = {
              id: arr[index].id,
              licenseNumber : item.license_number,
              status: 'delivered'
            }

            const NotifiedCar = {
              frameNo : item.frame_no,
              carId: item.car_id,
              carBbox : item.car_bbox,
              licensePlateBbox: item.license_plate_bbox,
              licensePlateBboxScore: item.license_plate_bbox_score,
              licenseNumber : item.license_number,
              licenseNumberScore : item.license_number_score,
              processedTime : item.processed_time,
              image : item.image,
              latitude: item.latitude,
              longitude : item.longitude
            }
            
            onSubmit('/update-restricted-number-plate', obj);
            onSubmit('/add-car-notifcation', NotifiedCar);

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
