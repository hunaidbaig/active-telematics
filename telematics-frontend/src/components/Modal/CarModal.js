import { Modal, Button, Carousel } from 'rsuite';
import Map from '../map/Map';
import moment from 'moment';


const CarModal = ({ handleClose, open, card  }) => {
  console.log('open',card)
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{card.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
              <div>
                {
                  card.type === 'face' ?
                  <Carousel autoplay className="custom-slider">
                    {
                      card.detected_frame.map((image, index)=>{
                        return(
                          <img key={index} width={'100%'} src={process.env.REACT_APP_BASE_IMAGE+`/${image}`} alt='detected face image' />
                        );
                      })
                    }
                  </Carousel>
                  :
                  <img width={'100%'} src={process.env.REACT_APP_BASE_IMAGE+`/${card.image}`} alt='car detail' />

                }
              </div>
              <div className='car_detail'>
                {
                  card.type === 'face' ? <></> :
                  <>
                    <h6>License Number:</h6>
                    <span>{card.license_number === undefined ? card.licenseNumber : card.license_number}</span>
                  </>
                }
                <br />
                <h6>Detected Time:</h6>
                <span>{moment.utc(card.processed_time === undefined ? card.processedTime : card.processed_time).format('MMMM Do YYYY, h:mm:ss A')}</span>
              </div>
              <div>
                <h6 style={{ marginBottom: '0.5rem' }}>Location:</h6>
                  {
                    card.type === 'face' ? 
                      <Map longitude={100.67227133333333} latitude={4.2068085} />
                    :
                      <Map longitude={card.longitude} latitude={card.latitude} />
                  }
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} carmodalearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CarModal;