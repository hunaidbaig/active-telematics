import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import NumberPlateNavbar from "./NumberPlateNavbar";
import SearchTable from "../../components/searchTable/SearchTable";
function NumberPlate() {
  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [ carsData, setCarsData ] = useState([]);
  const [ loading, setLoading ] = useState(false);


  useEffect(()=>{

    const fetchCars = async ()=>{

      try{
        setLoading(true)
        const response = await fetch('http://192.168.1.151:8000/all-license-plates/');
  
        const data = await response.json();
        
        if(data.length > 0){

          setCarsData([...data]);
          setLoading(false)
          console.log(data);
        }


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

  // const data = [
  //   {
  //     carid: 1,
  //     date: "2023-09-29",
  //     carNo: "ABC123",
  //     serialNo: "S12345",
  //     image: "car1.jpg",
  //   },
  //   {
  //     carid: 2,
  //     date: "2023-09-30",
  //     carNo: "XYZ789",
  //     serialNo: "S67890",
  //     image: "car2.jpg",
  //   },
  //   {
  //     carid: 3,
  //     date: "2023-08-30",
  //     carNo: "BTX269",
  //     serialNo: "S87923",
  //     image: "car3.jpg",
  //   },
  //   {
  //     carid: 4,
  //     date: "2023-09-30",
  //     carNo: "LJL370",
  //     serialNo: "S79274",
  //     image: "car4.jpg",
  //   },
  //   {
  //     carid: 5,
  //     date: "2023-09-15",
  //     carNo: "YUT769",
  //     serialNo: "S87922",
  //     image: "car5.jpg",
  //   },
  //   {
  //     carid: 6,
  //     date: "2023-07-01",
  //     carNo: "RET322",
  //     serialNo: "S14004",
  //     image: "car6.jpg",
  //   },
  //   {
  //     carid: 7,
  //     date: "2023-07-01",
  //     carNo: "RET322",
  //     serialNo: "S14004",
  //     image: "car6.jpg",
  //   },
  //   {
  //     carid: 8,
  //     date: "2023-07-01",
  //     carNo: "RET322",
  //     serialNo: "S14004",
  //     image: "car6.jpg",
  //   },
  //   {
  //     carid: 9,
  //     date: "2023-07-01",
  //     carNo: "RET322",
  //     serialNo: "S14004",
  //     image: "car6.jpg",
  //   },
  //   {
  //     carid: 10,
  //     date: "2023-07-01",
  //     carNo: "RET322",
  //     serialNo: "S14004",
  //     image: "car6.jpg",
  //   },
  //   // Add more dummy data here
  // ];

  return (
    <div
      className={`g-sidenav-show  bg-gray-100 ${
        dashboardToggle ? "g-sidenav-pinned" : ""
      } `}
    >
      <Sidebar dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <NumberPlateNavbar toggleHandle={toggleHandle} />
        <div className="container-fluid py-4">
          <SearchTable data={carsData} loading={loading} />
        </div>
      </main>
    </div>
  );
}

export default NumberPlate;
