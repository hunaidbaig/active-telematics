import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import DashboardNavBar from './DashboardNavBar'
import DashboardTotalCard from '../../components/dashboardTotalCard/DashboardTotalCard';
import DashboardHeroSection from '../../components/dashboardHeroSection/DashboardHeroSection';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const [dashboardToggle, setDashboardToggle] = useState(false);

  const toggleHandle = ()=>{
    setDashboardToggle(!dashboardToggle);
  }




  return (
    <>
        <div className={`g-sidenav-show  bg-gray-100 ${dashboardToggle ?'g-sidenav-pinned' : ''} ` }>

            <Sidebar dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
            <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                <DashboardNavBar  toggleHandle={toggleHandle} />
                <DashboardTotalCard />
                <DashboardHeroSection />
            </main>
        </div>
    </>
  )
}

export default Dashboard