import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin/Signin';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard/Dashboard';
import NumberPlate from './pages/NumberPlate/NumberPlate';
import FaceRecognition from './pages/FaceRecognition/FaceRecognition';
import ProtectedRoutes from './components/proctectedRoutes/ProtectedRoutes';
import Uploads from './pages/uploads/Uploads';
import RestrictedNumberPlate from './pages/Restricted Number Plate/RestrictedNumberPlate';
import CarModal from './components/Modal/CarModal';

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
        <Route  path='/number-plate' element={<ProtectedRoutes><NumberPlate/></ProtectedRoutes> }/>
        <Route  path='/face-recognition' element={ <ProtectedRoutes><FaceRecognition/></ProtectedRoutes> }/>
        <Route  path='/uploads' element={ <ProtectedRoutes><Uploads/></ProtectedRoutes> }/>
        <Route  path='/restricted_number_plate' element={ <ProtectedRoutes><RestrictedNumberPlate/></ProtectedRoutes> }/>
      </Routes>
    </>
  );
}

export default App;
