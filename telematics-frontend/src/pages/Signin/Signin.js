
import Header from '../../components/header/Header'
import SigninForm from '../../components/signinForm/SigninForm'
import Footer from '../../components/footer/Footer'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Signin() {
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage?.getItem('userToken');
  

  useEffect(()=>{
    if(isUserLoggedIn){
      navigate('/')
      }

  },[navigate, isUserLoggedIn])

  

  return (
    <>
      <Header title='Admin Signup' link='/signup' />
      <SigninForm />
      <Footer />

    </>
  );
}

export default Signin;
