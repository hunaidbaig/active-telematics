import { Modal, Button } from 'rsuite';
import Map from '../map/Map';
import moment from 'moment';


const CarModal = ({ handleClose, open, car  }) => {
  // console.log('open',car)
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Car Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
              <div>
                <img width={'100%'} src={process.env.REACT_APP_BASE_IMAGE+`/${car.image}`} alt='car detail' />
              </div>
              <div className='car_detail'>
                <h6>License Number:</h6>
                <span>{car.license_number === undefined ? car.licenseNumber : car.license_number}</span>
                <br />
                <h6>Detected Time:</h6>
                <span>{moment.utc(car.processed_time === undefined ? car.processedTime : car.processed_time).format('MMMM Do YYYY, h:mm:ss A')}</span>
              </div>
              <div>
                <h6 style={{ marginBottom: '0.5rem' }}>Location:</h6>
                <Map longitude={car.longitude} latitude={car.latitude} />
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