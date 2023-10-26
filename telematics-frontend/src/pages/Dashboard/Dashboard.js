import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import DashboardNavBar from './DashboardNavBar'
import DashboardTotalCard from '../../components/dashboardTotalCard/DashboardTotalCard';
import DashboardHeroSection from '../../components/dashboardHeroSection/DashboardHeroSection';
import axios from 'axios';

const Dashboard = () => {

  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [data, setData] = useState(null);
  const [loadData, setLoadData] = useState(null);

  useEffect(()=>{
    
    const fetch = async ()=>{
      setLoadData(true);
      try{
        const response = await axios.get('http://13.235.82.14:5000/api/get-unique-license-plate');
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

    fetch();

  },[])

  const toggleHandle = ()=>{
    setDashboardToggle(!dashboardToggle);
  }





  return (
    <>
        <div className={`g-sidenav-show  bg-gray-100 ${dashboardToggle ?'g-sidenav-pinned' : ''} ` }>

            <Sidebar dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
            <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                <DashboardNavBar  toggleHandle={toggleHandle} />
                <DashboardTotalCard data={data} />
                <DashboardHeroSection data={data} loadData={loadData} />
            </main>
        </div>
    </>
  )
}

export default Dashboard
