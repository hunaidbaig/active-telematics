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
        const response = await fetch('http://localhost:5000/api/get-all-license-plate');
  
        const result = await response.json();

        if(result.Bool){
          const { data } = result;

          if(data.length > 0){

            let numPlateData = [];

            data.forEach((item) => {
              const match = numPlateData.find((license) => license.licenseNumber === item.licenseNumber);

              if (match) {
                if (match.licenseNumberScore < item.licenseNumberScore) {
                  numPlateData = numPlateData.map((license) =>
                    license.licenseNumber === item.licenseNumber ? item : license
                  );
                }
              } else {
                numPlateData.push(item);
              }
            });

            console.log(numPlateData)

            setCarsData([...numPlateData]);
            setLoading(false)
            console.log(data);
          }
          
        }

        console.log(result.data)
        


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
  //     car_id: 1,
  //     processed_time: "2023-09-29",
  //     license_number: "ABC123",
  //     license_number_score: "S12345",
  //     image: "car1.jpg",
  //   },
  //   {
  //     car_id: 2,
  //     processed_time: "2023-09-30",
  //     license_number: "XYZ789",
  //     license_number_score: "S67890",
  //     image: "car2.jpg",
  //   },
  //   {
  //     car_id: 3,
  //     processed_time: "2023-08-30",
  //     license_number: "BTX269",
  //     license_number_score: "S87923",
  //     image: "car3.jpg",
  //   },
  //   {
  //     car_id: 4,
  //     processed_time: "2023-09-30",
  //     license_number: "LJL370",
  //     license_number_score: "S79274",
  //     image: "car4.jpg",
  //   },
  //   {
  //     car_id: 5,
  //     processed_time: "2023-09-15",
  //     license_number: "YUT769",
  //     license_number_score: "S87922",
  //     image: "car5.jpg",
  //   },
  //   {
  //     car_id: 6,
  //     processed_time: "2023-07-01",
  //     license_number: "RET322",
  //     license_number_score: "S14004",
  //     image: "car6.jpg",
  //   },
  //   {
  //     car_id: 7,
  //     processed_time: "2023-07-01",
  //     license_number: "RET322",
  //     license_number_score: "S14004",
  //     image: "car6.jpg",
  //   },
  //   {
  //     car_id: 8,
  //     processed_time: "2023-07-01",
  //     license_number: "RET322",
  //     license_number_score: "S14004",
  //     image: "car6.jpg",
  //   },
  //   {
  //     car_id: 9,
  //     processed_time: "2023-07-01",
  //     license_number: "RET322",
  //     license_number_score: "S14004",
  //     image: "car6.jpg",
  //   },
  //   {
  //     car_id: 10,
  //     processed_time: "2023-07-01",
  //     license_number: "RET322",
  //     license_number_score: "S14004",
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
