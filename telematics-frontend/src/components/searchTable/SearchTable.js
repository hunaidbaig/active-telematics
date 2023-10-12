import React, { useState , useRef} from "react";
import "./searchTable.css";
import DateRangePicker from 'rsuite/DateRangePicker';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
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



  const mapRef = useRef(null);

  const startPos = useRef({ x: 0, y: 0 });
  const endPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
      startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e) => {
      endPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMapClick = () => {
      const dx = endPos.current.x - startPos.current.x;
      const dy = endPos.current.y - startPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 10) {  // If mouse moved less than 10 pixels, it's likely a click not a drag
          const mapEl = mapRef.current;
     
      if (!document.fullscreenElement) {
        
          if (mapEl.requestFullscreen) {
              mapEl.requestFullscreen();
          } else if (mapEl.mozRequestFullScreen) { /* Firefox */
              mapEl.mozRequestFullScreen();
          } else if (mapEl.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
              mapEl.webkitRequestFullscreen();
          } else if (mapEl.msRequestFullscreen) { /* IE/Edge */
              mapEl.msRequestFullscreen();
          }
      } else {

          if (document.exitFullscreen) {
              document.exitFullscreen();
          } else if (document.mozCancelFullScreen) { /* Firefox */
              document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
              document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) { /* IE/Edge */
              document.msExitFullscreen();
          }
      }
      }
  };

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

  if (selectedFilter === "licenseNumberScore") {
    const licenseNumberScore = item.licenseNumberScore.toString();
    return licenseNumberScore.toLowerCase().includes(filter.toLowerCase());
  }

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
        <img className="modal-content" id="img01" src= {process.env.PUBLIC_URL+currentImage} alt={'number plate image'}
          onError={(e)=>{
            e.target.src = process.env.PUBLIC_URL+`/assets/images/2023-10-09 12:44:46_frame_18.jpg`
          }}
        />
      </div>
    }
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div class="card-header pb-0">
              {
                show ? <DateRangePicker showOneCalendar style={{ width: '100%' }} onOk={ (value) => dateChangeHandler(value) } onClean={()=> cleanHandle()} /> 
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
                <option value="licenseNumberScore">License No score</option>
              </select>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      {/* <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Car ID
                      </th> */}
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Date
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        License number 
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        license Number Score
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Image
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    { loading ? <p>loading</p> : filteredDataWithLicenseNumber.map((item, index) => {
                      // console.log(item);
                      // const plateImage = `${item.image.split('/').slice(4).join('/')}`;
                      const plateImage = item.image
                      const plateImage2 = `${process.env.PUBLIC_URL}/assets/images/${plateImage}`;

                      return(
                          <tr key={index}>
                          {/* <td class="text-xs font-weight-bold mb-0 text-secondary">
                            {item.car_id}
                          </td> */}
                          <td class="text-xs font-weight-bold mb-0 text-secondary">{item.processedTime}</td>
                          <td class="text-xs font-weight-bold mb-0 text-secondary">
                            {item.licenseNumber}
                          </td>
                          <td class="text-xs font-weight-bold mb-0 text-secondary">
                            {item.licenseNumberScore}
                          </td>
                          <td class="text-xs font-weight-bold mb-0 " >
                          <img
                            id="myImg"
                            src={plateImage2}
                            alt="Snow"
                            width={'50'}
                            onClick={() => {

                              openModal(plateImage2, 'Snow')
                            }}
                            // onError={(e)=>{
                            //   console.log(plateImage2)
                            //   //e.target.src = process.env.PUBLIC_URL+`/assets/images/2023-10-09 12:44:46_frame_18.jpg`
                            // }}
                          />
                        
                            {/* <img src={plateImage2} alt={index} width="50"
                              onError={(e)=>{
                                e.target.src = process.env.PUBLIC_URL+`/assets/images/2023-10-09 12:44:46_frame_18.jpg`
                              }}

                            /> */}
                          </td>
                          <td >
                          <div 
                              ref={mapRef} 
                              style={{ height: "80px", width: "100%", display: 'flex', flexDirection: 'column' }}
                              onMouseDown={handleMouseDown}
                              onMouseUp={handleMouseUp}
                              onClick={handleMapClick}
                          >
                              <MapContainer center={[item.latitude, item.longitude]} zoom={13} style={{ flex: 1, borderRadius:"15px" }}>
                                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                  <Marker position={[item.latitude, item.longitude]}></Marker>
                                  {/* <Marker position={[item.latitude+1, item.longitude+1]}></Marker> */}
                              </MapContainer>
                          </div>
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