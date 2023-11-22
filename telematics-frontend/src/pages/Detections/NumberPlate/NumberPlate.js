import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SearchTable from "../../../components/searchTable/SearchTable";
import NavBar from "../../../components/navBar/NavBar";
function NumberPlate() {
  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [ carsData, setCarsData ] = useState([]);
  const [ loading, setLoading ] = useState(false);


  useEffect(()=>{

    const fetchCars = async ()=>{

      try{
        setLoading(true)
        const response = await fetch('http://13.235.82.14:5000/api/get-all-license-plate');
  
        const result = await response.json();

        if(result.Bool){
          const { data } = result;

          if(data.length > 0){

            // let numPlateData = [];

            // data.forEach((item) => {
            //   const match = numPlateData.find((license) => license.licenseNumber === item.licenseNumber);

            //   if (match) {
            //     if (match.licenseNumberScore < item.licenseNumberScore) {
            //       numPlateData = numPlateData.map((license) =>
            //         license.licenseNumber === item.licenseNumber ? item : license
            //       );
            //     }
            //   } else {
            //     numPlateData.push(item);
            //   }
            // });

            // console.log(numPlateData)

            setCarsData([...data]);
            setLoading(false)
            console.log(data);
          }
          
        }

        // console.log(result.data)
        


      }
      catch(e){
        console.log(e);
      }


    }

    fetchCars();

  },[])


  const toggleHandle = () => {
    setDashboardToggle(!dashboardToggle);
  };


  return (
    <div
      className={`g-sidenav-show  bg-gray-100 ${
        dashboardToggle ? "g-sidenav-pinned" : ""
      } `}
    >
      <Sidebar dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <NavBar toggleHandle={toggleHandle} title={'Number Plate'} nestedRoute={'Detections'} /> 
        <div className="container-fluid py-4">
          <SearchTable data={carsData} loading={loading} />
        </div>
      </main>
    </div>
  );
}

export default NumberPlate;
