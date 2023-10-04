import React, { useState } from "react";
import "./searchTable.css";
const SearchTable = ({ data, loading }) => {
  const [filter, setFilter] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("car_id");


  const filteredData = data.filter((item) => {
    const searchBy =
      selectedFilter === "car_id"
        ? item.car_id.toString()
        : selectedFilter === "processed_time"
        ? item.processed_time
        : selectedFilter === "license_number_score"
        ? item.license_number_score
        : item.license_number;

    return searchBy?.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div class="card-header pb-0">
            <div className="search-bar">
              <input
                type="text"
                placeholder="search here"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="form-control"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="form-control bg-gradient-primary" style={{
                color:"white",
                marginTop: '0.5rem'
              }}
            >
              <option value="license_number">License Number</option>
              <option value="processed_time">Date</option>
              <option value="license_number_score ">License No score</option>
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
