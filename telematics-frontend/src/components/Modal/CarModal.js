import { Modal, Button } from 'rsuite';


const CarModal = ({ handleClose, open, car  }) => {
  // console.log('open')
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Car Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
              <div>
                <img width={'100%'} src={process.env.PUBLIC_URL+'/assets/images/frames/09:42:25.950374_frame_18.jpg'} alt='car detail' />
              </div>
              <div className='car_detail'>
                <h6>License Number:</h6>
                <span>{car.license_number}</span>
                <br />
                <h6>Process Time:</h6>
                <span>{car.processed_time}</span>
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