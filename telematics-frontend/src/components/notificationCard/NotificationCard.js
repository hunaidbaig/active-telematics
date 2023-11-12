import React from 'react'
import { Panel, Stack } from 'rsuite'

const NotificationCard = ({ licenseNumber, time }) => {
  return (
    <Panel
        bordered
        header={
        <Stack justifyContent="space-between">
            <span style={{ fontWeight: "800" }} >Car Detected</span>
        </Stack>
        }
    >
        <Stack spacing={20}>
            <img src={process.env.PUBLIC_URL+'/assets/images/frames/09:42:25.950374_frame_18.jpg'} width={'150px'} alt='detected' />
            <Stack style={{ display:'flex' }}>
                <div style={{ display:'flex', flexDirection:"column", alignItems:"center" }}>
                    <p>License Number:</p>
                    <p>{licenseNumber}</p>
                </div>
                <div style={{ marginLeft: '1rem', display:'flex', flexDirection:"column", alignItems:"center" }}>
                    <p>Detected Time:</p>
                    <p>{time}</p>
                </div>  
            </Stack>
        </Stack>

    </Panel>
  )
}

export default NotificationCard;