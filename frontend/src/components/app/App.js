import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import Home from '../home/Home'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  const [userData,setUserData] = useState(null)
    return (
        <Routes>
          <Route path='/' element={<Home navigate={ useNavigate() } />} />
          <Route path='/posts'  element={<Feed navigate={ useNavigate() } userData={userData} storeUserData={setUserData}/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() } storeUserData={setUserData}/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
        </Routes>
    );
}

export default App;
