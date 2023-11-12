import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin/Signin';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard/Dashboard';
import NumberPlate from './pages/NumberPlate/NumberPlate';
import FaceRecognition from './pages/FaceRecognition/FaceRecognition';
import ProtectedRoutes from './components/proctectedRoutes/ProtectedRoutes';
import Uploads from './pages/uploads/Uploads';
import RestrictedNumberPlate from './pages/Restricted Number Plate/RestrictedNumberPlate';

function App() {
  return (
    <>
      <ToastContainer
        style={{
          zIndex: '11'
        }}
      />
        {/* <Route path='/signup' element={<Signup />} />  */}
      <Routes>
        <Route path='/signin' element={<Signin />} />

         <Route path='/' element={ <ProtectedRoutes><Dashboard /></ProtectedRoutes>} /> 
        <Route  path='/number-plate' element={<ProtectedRoutes><NumberPlate/></ProtectedRoutes> }/>
        <Route  path='/face-recognition' element={ <ProtectedRoutes><FaceRecognition/></ProtectedRoutes> }/>
        <Route  path='/uploads' element={ <ProtectedRoutes><Uploads/></ProtectedRoutes> }/>
        <Route  path='/restricted_number_plate' element={ <ProtectedRoutes><RestrictedNumberPlate/></ProtectedRoutes> }/>
      </Routes>
    </>
  );
}

export default App;
