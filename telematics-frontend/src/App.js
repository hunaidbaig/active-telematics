import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import NumberPlate from './pages/NumberPlate/NumberPlate';
import FaceRecognition from './pages/FaceRecognition/FaceRecognition';
import ProtectedRoutes from './components/proctectedRoutes/ProtectedRoutes';

function App() {
  return (
    <>
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/' element={ <ProtectedRoutes><Dashboard /></ProtectedRoutes>} /> 
        <Route  path='/number-plate' element={<ProtectedRoutes><NumberPlate/></ProtectedRoutes> }/>
        <Route  path='/face-recognition' element={ <ProtectedRoutes><FaceRecognition/></ProtectedRoutes> }/>
      </Routes>
    </>
  );
}

export default App;
