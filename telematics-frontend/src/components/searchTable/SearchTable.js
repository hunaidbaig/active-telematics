import React, { useState } from "react";
import "./searchTable.css";
import DateRangePicker from 'rsuite/DateRangePicker';
import 'leaflet/dist/leaflet.css';
import Map from "../map/Map";
import moment from "moment";
// import { Loader } from "rsuite";

const SearchTable = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("licenseNumber");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [dateSelected, setDateSelected] = useState(false);
  const [licenseNumberFilter, setLicenseNumberFilter] = useState("");


const filteredData = data.filter((item) => {

  if (selectedFilter === "processedTime") {
    const processedTime = item.processedTime;

    if (startDate && endDate) {
      const itemDate = new Date(processedTime);
      
      return (
        itemDate >= startDate && itemDate <= endDate
      );
    }
    return processedTime.toLowerCase().includes(filter.toLowerCase());

  }

  // if (selectedFilter === "licenseNumberScore") {
  //   const licenseNumberScore = item.licenseNumberScore.toString();
  //   return licenseNumberScore.toLowerCase().includes(filter.toLowerCase());
  // }

  const licenseNumber = item.licenseNumber.toString();
  return licenseNumber.toLowerCase().includes(filter.toLowerCase());

});


  const selectHandler = (e)=>{

    if(e.target.value === 'processedTime') {
      setShow(true);
      setSelectedFilter(e.target.value)
    }
    else{
      setShow(false);
      console.log('set')
      setSelectedFilter(e.target.value)
    }

    setDateSelected(false)
  }

  const dateChangeHandler = (value)=>{

    const dateStart = new Date(value[0]);
    dateStart.setDate(dateStart.getDate()-1);
    // dateStart.setDate(dateStart.getDate());
    const dateEnd = new Date(value[1]);

    setStartDate(dateStart)
    setEndDate(dateEnd);
    setDateSelected(true)

  }

const cleanHandle = ()=>{
  setEndDate(null);
  setStartDate(null);
  setDateSelected(false);
}



  const openModal = (imageSrc, altText) => {
    console.log(imageSrc, altText)
    setCurrentImage(imageSrc);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const handleLicenseNumberFilterChange = (event) => {
    setLicenseNumberFilter(event.target.value);
  };

  const filteredDataWithLicenseNumber = licenseNumberFilter
  ? filteredData.filter((item) =>
      item.licenseNumber.toLowerCase().includes(licenseNumberFilter.toLowerCase())
    )
  : filteredData;

  return (
    <>
    {
      modalVisible &&
      <div id="myModal" className="my-modal" >
        <span className="close" onClick={closeModal}>&times;</span>
        <img className="modal-content" id="img01" src= {currentImage} alt={'number plate '}
        />
      </div>
    }
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header pb-0">
              {
                show ? <DateRangePicker showOneCalendar placeholder="Select Date Range"  style={{ width: '100%' }} onOk={ (value) => dateChangeHandler(value) } onClean={()=> cleanHandle()} /> 
                : 
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="search here"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="form-control"
                  />
                </div>
              }
              {
                dateSelected ?  <div style={{ marginTop: "0.5rem" }} className="search-bar">
                  <input
                    type="text"
                    placeholder="search license number "
                    value={licenseNumberFilter}
                    onChange={handleLicenseNumberFilterChange}
                    className="form-control"
                    />
                  </div> : <></>
              }

              
              <select
                value={selectedFilter}
                onChange={(e) => selectHandler(e)}
                className="form-control bg-gradient-primary" style={{
                  color:"white",
                  marginTop: '0.5rem'
                }}
              >
                <option value="">License Number</option>
                <option value="processedTime">Date</option>
                {/* <option value="licenseNumberScore">License No score</option> */}
              </select>
            </div>
            <div className="card-body px-0 pt-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Date
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        License number 
                      </th>
                      {/* <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        license Number Score
                      </th> */}
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Image
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    { loading ? loading : filteredDataWithLicenseNumber.map((item, index) => {
                      
                      const plateImage = item.image
                      const plateImage2 = `${process.env.REACT_APP_BASE_IMAGE}/${plateImage}`;

                      return(
                          <tr key={index}>
                            <td className="text-xs font-weight-bold mb-0 text-secondary">{moment.utc(item.processedTime).format('MMMM Do YYYY, h:mm:ss A')}</td>
                            <td className="text-xs font-weight-bold mb-0 text-secondary">
                              {item.licenseNumber}
                            </td>
                            {/* <td className="text-xs font-weight-bold mb-0 text-secondary">
                              {item.licenseNumberScore}
                            </td> */}
                            <td className="text-xs font-weight-bold mb-0 " >
                              <img
                                id="myImg"
                                src={plateImage2}
                                alt="Snow"
                                width={'80'}
                                onClick={() => {

                                  openModal(plateImage2, 'Snow')
                                }}
                              />
                            </td>
                            <td>
                              <Map longitude={item.longitude} latitude={item.latitude} />
                            </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
        </div>
        </div>
      </div>

    

    </>


  );
};

export default SearchTable;