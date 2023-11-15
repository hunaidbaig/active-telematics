import moment from 'moment';
import React from 'react'
import { Panel, Stack } from 'rsuite'
import './style.css'

const NotificationCard = ({ car }) => {
  return (
    <Panel
        bordered={false}
        header={
        <Stack justifyContent="space-between" className='notification-heading'>
            <span style={{ fontWeight: "800" }} >Car Detected</span>
        </Stack>
        }
    >
        <div className='notfication-main-container'>
            <img src={process.env.REACT_APP_BASE_IMAGE+`/${car.image}`} width={'150px'} alt='detected' />
            <div className='notification-body'>
                <div className='notification-detail'>
                    <h6>License Number:</h6>
                    <p>{car.license_number}</p>
                </div>
                <div className='notification-detail hide-detail'>
                    <h6>Detected Time:</h6>
                    <p>{moment(car.processed_time).format('MMMM Do YYYY, h:mm:ss a')}</p>
                </div>  
            </div>
        </div>

    </Panel>
  )
}

export default NotificationCard;