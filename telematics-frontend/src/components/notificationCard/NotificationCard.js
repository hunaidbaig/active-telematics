import moment from 'moment';
import React from 'react'
import { Panel, Stack } from 'rsuite'

const NotificationCard = ({ car }) => {
  return (
    <Panel
        bordered={false}
        header={
        <Stack justifyContent="space-between">
            <span style={{ fontWeight: "800" }} >Car Detected</span>
        </Stack>
        }
    >
        <Stack spacing={20}>
            <img src={process.env.REACT_APP_BASE_IMAGE+`/${car.image}`} width={'150px'} alt='detected' />
            <Stack style={{ display:'flex' }}>
                <div style={{ display:'flex', flexDirection:"column", alignItems:"center" }}>
                    <p>License Number:</p>
                    <p>{car.license_number}</p>
                </div>
                <div style={{ marginLeft: '1rem', display:'flex', flexDirection:"column", alignItems:"center" }}>
                    <p>Detected Time:</p>
                    <p>{moment(car.processed_time).format('MMMM Do YYYY, h:mm:ss a')}</p>
                </div>  
            </Stack>
        </Stack>

    </Panel>
  )
}

export default NotificationCard;