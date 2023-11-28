import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import DashboardTotalCard from '../../components/dashboardTotalCard/DashboardTotalCard';
import DashboardHeroSection from '../../components/dashboardHeroSection/DashboardHeroSection';
import NavBar from '../../components/navBar/NavBar';
import { toast } from 'react-toastify';
import NotificationCard from '../../components/notificationCard/NotificationCard';
import { api } from '../../api/Config';
import UseFetch from '../../hooks/UseFetch';


const Dashboard = ({ handleOpen }) => {

  const [dashboardToggle, setDashboardToggle] = useState(false);
  const { data, loadData, fetch, } = UseFetch();
  const { data : restrictedData, fetch : fetchRestricted, } = UseFetch();
  const { data : restrictedFace, fetch : fetchRestrictedFace, } = UseFetch();
  const { data : faces, fetch : fetchFaceNotification, } = UseFetch();
  const { data : cars, fetch : fetchCarNotification, } = UseFetch();
  

  useEffect(()=>{

    (async()=>{
      await Promise.all([
        fetch('/get-unique-license-plate'),
        fetchRestricted('/get-restricted-number-plate'),
        fetchRestrictedFace('/get-restricted-images'),
        fetchFaceNotification('/get-all-face-notifcation'),
        fetchCarNotification('/get-all-car-notifcation')
      ])
    })()

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

  const reuseTostify = (item)=>{
    toast(<NotificationCard card={item} />, {
      position: "bottom-left",
      autoClose: false, 
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: 'notification-card',
      onClick :()=>{
        console.log('hello')
        handleOpen(item);
      }})
  }
  

  useEffect(()=>{
    if(data && restrictedData && restrictedFace ){
      console.log(restrictedFace, data, 'data')
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
            const updateItem = { ...item, type: 'car', title: 'Car Detected' }
            
            reuseTostify(updateItem);

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

      restrictedFace?.map(item=>{
        if(item.is_detected && item.status === 'pending'){
          const obj = { ...item, type: 'face', title: 'Face Detected' }
          reuseTostify(obj);

          onSubmit('/update-detected-face', { ...item, status: 'deliverd' });
          onSubmit('/add-face-notifcation', { ...item, status: 'deliverd' });
        }
      })

      // console.log(result, 'result');
      // console.log(data, restrictedData)
    }
  },[restrictedData, restrictedFace])




  const toggleHandle = ()=>{
    setDashboardToggle(!dashboardToggle);
  }





  return (
    <>
        <div className={`g-sidenav-show  bg-gray-100 ${dashboardToggle ?'g-sidenav-pinned' : ''} ` }>

            <Sidebar dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                <NavBar toggleHandle={toggleHandle} title={'Dashboard'} />
                <DashboardTotalCard data={data} faces={faces} cars={cars} />
                <DashboardHeroSection data={data} loadData={loadData} />
            </main>
        </div>
    </>
  )
}

export default Dashboard;
