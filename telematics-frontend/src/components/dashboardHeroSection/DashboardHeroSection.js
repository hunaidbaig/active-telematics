import React, { useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { Bar, Line } from "react-chartjs-2";

Chart.register(...registerables);



const DashboardHeroSection = ({ data, loadData }) => {
  
  const [monthWiseData, setMonthWiseData] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);

  useEffect(()=>{

    if(data){
      const updatedData = [...monthWiseData];
      const filterData = data.map(car=>{
        const date = new Date(car.processed_time);
        const month = date.getMonth();
        
        const element = updatedData[month];
        updatedData[month] = element+1;       
        return ;
      })
      // console.log(updatedData)
      setMonthWiseData(updatedData);

      // console.log(filterData)
      // console.log(monthWiseData)
    }

  },[data?.length>0])

  const lineChatData = {
    labels: ['Jan', 'Feb', 'March',"Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Cars",
      tension: 0.4,
      borderWidth: 0,
      pointRadius: 0,
      borderColor: "#98C93C",
      borderWidth: 3,
      // backgroundColor: 'rgba(0, 230, 0, 50)',
      fill: true,
      data: monthWiseData,
      maxBarThickness: 6

    },
    // {
    //   label: "Websites",
    //   tension: 0.4,
    //   borderWidth: 0,
    //   pointRadius: 0,
    //   borderColor: "#3A416F",
    //   borderWidth: 3,
    //   // backgroundColor: 'rgba(20,23,39,0.2)',
    //   fill: true,
    //   data: [0, 0, 40, 140, 290, 290, 340, 230, 400],
    //   maxBarThickness: 6
    // },
    ],
  }

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5]
        },
        ticks: {
          display: true,
          padding: 10,
          color: '#b2b9bf',
          font: {
            size: 11,
            family: "Open Sans",
            style: 'normal',
            lineHeight: 2
          },
        }
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderDash: [5, 5]
        },
        ticks: {
          display: true,
          color: '#b2b9bf',
          padding: 20,
          font: {
            size: 11,
            family: "Open Sans",
            style: 'normal',
            lineHeight: 2
          },
        }
      },
    },
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'March',"Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Cars",
      tension: 0.4,
      borderWidth: 0,
      borderRadius: 4,
      borderSkipped: false,
      backgroundColor: "#fff",
      data: [...monthWiseData],
      maxBarThickness: 6
    }]
  };
  
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        type: 'linear',
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 500,
          beginAtZero: true,
          padding: 15,
          font: {
            size: 14,
            family: "Open Sans",
            style: 'normal',
            lineHeight: 2
          },
          color: "#fff"
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false
        },
        ticks: {
          display: false
        },
      },
    },
  };


  return (
    <div className="row mt-4">
        <div className="col-lg-5 mb-lg-0 mb-4">
          <div className="card z-index-2">
            <div className="card-body p-3">
              <div className="bg-gradient-dark border-radius-lg py-3 pe-1 mb-3">
                <div className="chart">
                  <Bar id="ckdas" data={barChartData} options={barChartOptions}   className="chart-canvas" height="170" />
                </div>
              </div>
              <h6 className="ms-2 mt-4 mb-0"> Total Cars Detected </h6>
              <p className="text-sm ms-2"> (<span className="font-weight-bolder">+23%</span>) than last week </p>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="card z-index-2">
            <div className="card-header pb-0">
              <h6>Cars overview</h6>
              <p className="text-sm">
                <i className="fa fa-arrow-up text-success"></i>
                <span className="font-weight-bold">4% more</span> in 2023
              </p>
            </div>
            <div className="card-body p-3">
              <div className="chart">
                <Line data={lineChatData} options={lineChartOptions}  className='chart-canvas' height={'300'} />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default DashboardHeroSection