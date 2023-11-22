import React, { useState } from 'react'
import { PiWarningOctagonDuotone } from "react-icons/pi";
import Sidebar from '../../components/Sidebar/Sidebar';
import NavBar from '../../components/navBar/NavBar';
import LinkCard from '../../components/linkCard/LinkCard';

const links = [
    {
        to: '/restricted-entries/restricted-number-plate',
        title : 'Restricted Number Plate',
        icon: <PiWarningOctagonDuotone />
    },
    {
        to: '/restricted-entries/restricted-faces',
        title : 'Restricted Faces',
        icon: <PiWarningOctagonDuotone />
    }
]

const RestrictedEntries = () => {
    const [dashboardToggle, setDashboardToggle] = useState(false);

    const toggleHandle = ()=>{
        setDashboardToggle(!dashboardToggle);
    }

    return (
        <>
            <div className={`g-sidenav-show  bg-gray-100 ${dashboardToggle ?'g-sidenav-pinned' : ''} ` }>
                <Sidebar  dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    <NavBar toggleHandle={toggleHandle} title={'Restricted Entries'} />
                    <LinkCard links={links} />
                    {/* <DashboardTotalCard data={data} /> */}
                    {/* <DashboardHeroSection data={data} loadData={loadData} /> */}
                </main>
            </div>
        </>
    )
}

export default RestrictedEntries