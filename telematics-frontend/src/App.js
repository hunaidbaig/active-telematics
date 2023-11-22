import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin/Signin';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoutes from './components/proctectedRoutes/ProtectedRoutes';
import Uploads from './pages/uploads/Uploads';
import CarModal from './components/Modal/CarModal';
import Detections from './pages/Detections/Detections';
import NumberPlate from './pages/Detections/NumberPlate/NumberPlate';
import FaceRecognition from './pages/Detections/FaceRecognition/FaceRecognition';
import RestrictedNumberPlate from './pages/RestrictedEntries/Restricted Number Plate/RestrictedNumberPlate';
import RestrictedFaces from './pages/RestrictedEntries/RestrictedFaces/RestrictedFaces';
import RestrictedEntries from './pages/RestrictedEntries/RestrictedEntries';

function App() {
  const [open, setOpen] = React.useState(false);
  const [carData, setCarData] = React.useState(null);



  const handleOpen = (car) => {
    console.log(car)
    setOpen(true)
    setCarData({...car})
  };
  const handleClose = () => {
    setOpen(false);
    setCarData(null)
  };

  return (
    <>
      <ToastContainer
        className={'toaster-main'}
        style={{
          zIndex: '111',
        }}
      />
        {/* <Route path='/signup' element={<Signup />} />  */}
        {
          open && <CarModal handleClose={handleClose} open={open} car={carData} />
        }
      <Routes>
        <Route path='/signin' element={<Signin />} />

        <Route path='/' element={ <ProtectedRoutes><Dashboard handleOpen={handleOpen} /></ProtectedRoutes>} /> 
        <Route path='/detections' element={ <ProtectedRoutes><Detections handleOpen={handleOpen} /></ProtectedRoutes>} />
          <Route  path='/detections/number-plate' element={<ProtectedRoutes><NumberPlate/></ProtectedRoutes> }/>
          <Route  path='/detections/face-recognition' element={ <ProtectedRoutes><FaceRecognition/></ProtectedRoutes> }/>
        
        <Route  path='/restricted-entries' element={ <ProtectedRoutes><RestrictedEntries/></ProtectedRoutes> }/>
          <Route  path='/restricted-entries/restricted-number-plate' element={ <ProtectedRoutes><RestrictedNumberPlate/></ProtectedRoutes> }/>
          <Route  path='/restricted-entries/restricted-faces' element={ <ProtectedRoutes><RestrictedFaces/></ProtectedRoutes> }/>
        <Route  path='/uploads' element={ <ProtectedRoutes><Uploads/></ProtectedRoutes> }/>

      </Routes>
    </>
  );
}

export default App;
