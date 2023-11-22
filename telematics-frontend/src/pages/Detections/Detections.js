import React, { useState } from 'react'
import { MdOutlinePersonSearch } from "react-icons/md";
import { FaCarSide } from "react-icons/fa6";
import Sidebar from '../../components/Sidebar/Sidebar';
import NavBar from '../../components/navBar/NavBar';
import LinkCard from '../../components/linkCard/LinkCard';

const links = [
    {
        to: '/detections/number-plate',
        title : 'Number Plate',
        icon : <FaCarSide />
    },
    {
        to: '/detections/face-recognition',
        title : 'Face Recognition',
        icon: <MdOutlinePersonSearch />
    }
]

const Detections = () => {
    const [dashboardToggle, setDashboardToggle] = useState(false);

    const toggleHandle = ()=>{
        setDashboardToggle(!dashboardToggle);
    }

    return (
        <>
            <div className={`g-sidenav-show  bg-gray-100 ${dashboardToggle ?'g-sidenav-pinned' : ''} ` }>
                <Sidebar  dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    <NavBar toggleHandle={toggleHandle} title={'Detections'} backBtn={'/'} />
                    <LinkCard links={links} />
                    {/* <DashboardTotalCard data={data} /> */}
                    {/* <DashboardHeroSection data={data} loadData={loadData} /> */}
                </main>
            </div>
        </>
    )
}

export default Detections