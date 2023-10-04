import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import SignupForm from '../../components/signupForm/SignupForm'
import { useNavigate } from 'react-router-dom';


function Signup() {
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage?.getItem('userToken');

  useEffect(()=>{
    if(isUserLoggedIn){
      navigate('/')
      }

  },[navigate, isUserLoggedIn])

  return (
    <>
      <Header title='Admin Signin' link='/signin' />
      <SignupForm />
      <Footer />
    </>
  )
}

export default Signup