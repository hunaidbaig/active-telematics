import React, { useState } from "react";
import "./searchTable.css";
import DateRangePicker from 'rsuite/DateRangePicker';


const SearchTable = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("license_number");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


const filteredData = data.filter((item) => {

  if (selectedFilter === "processed_time") {
    const processedTime = item.processed_time;

    if (startDate && endDate) {
      const itemDate = new Date(processedTime);
      
      return (
        itemDate >= startDate && itemDate <= endDate
      );
    }

    return processedTime.toLowerCase().includes(filter.toLowerCase());
  }

  if (selectedFilter === "license_number_score") {
    const licenseNumberScore = item.license_number_score.toString();
    return licenseNumberScore.toLowerCase().includes(filter.toLowerCase());
  }

  const licenseNumber = item.license_number.toString();
  return licenseNumber.toLowerCase().includes(filter.toLowerCase());
});


  const selectHandler = (e)=>{

    if(e.target.value === 'processed_time') {
      setShow(true);
      setSelectedFilter(e.target.value)
    }
    else{
      setShow(false);
      console.log('set')
      setSelectedFilter(e.target.value)
    }
  }

  const dateChangeHandler = (value)=>{

    const dateStart = new Date(value[0]);
    dateStart.setDate(dateStart.getDate()-1);
    const dateEnd = new Date(value[1]);

    setStartDate(dateStart)
    setEndDate(dateEnd);
  }

const cleanHandle = ()=>{
  setEndDate(null);
  setStartDate(null);
}


  return (
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
            
            <select
              value={selectedFilter}
              onChange={(e) => selectHandler(e)}
              className="form-control bg-gradient-primary" style={{
                color:"white",
                marginTop: '0.5rem'
              }}
            >
              <option value="license_number">License Number</option>
              <option value="processed_time">Date</option>
              <option value="license_number_score">License No score</option>
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
                  </tr>
                </thead>
                <tbody>
                  { loading ? <p>loading</p> : filteredData.map((item, index) => (
                    <tr key={index}>
                      {/* <td class="text-xs font-weight-bold mb-0 text-secondary">
                        {item.car_id}
                      </td> */}
                      <td class="text-xs font-weight-bold mb-0 text-secondary">{item.processed_time}</td>
                      <td class="text-xs font-weight-bold mb-0 text-secondary">
                        {item.license_number}
                      </td>
                      <td class="text-xs font-weight-bold mb-0 text-secondary">
                        {item.license_number_score}
                      </td>
                      <td class="text-xs font-weight-bold mb-0 ">
                        <img src={item.image} alt="" width="50" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTable;
