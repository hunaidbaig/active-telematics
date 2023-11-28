import moment from 'moment';
import React from 'react'
import { Panel, Stack } from 'rsuite'
import './style.css'

const NotificationCard = ({ card }) => {
  return (
    <Panel
        bordered={false}
        header={
        <Stack justifyContent="space-between" className='notification-heading'>
            <span style={{ fontWeight: "800" }} >{ card.title}</span>
        </Stack>
        }
    >
        <div className='notfication-main-container'>
            <img src={process.env.REACT_APP_BASE_IMAGE+`/${card.image == undefined ? card.name : card.image}`} height={'100px'} width={'150px'} alt='detected' />
            <div className='notification-body'>
                {
                    card.type === 'face' ? <></> :
                    <div className='notification-detail'>
                        <h6>License Number:</h6>
                        <p>{card.license_number}</p>
                    </div>
                }
                <div className='notification-detail hide-detail'>
                    <h6>Detected Time:</h6>
                    <p>{moment.utc(card.processed_time).format('MMMM Do YYYY, h:mm:ss A')}</p>
                </div>  
            </div>
        </div>

    </Panel>
  )
}

export default NotificationCard;