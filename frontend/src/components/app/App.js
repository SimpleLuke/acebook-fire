import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import PostById from '../postById/PostById';
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  const [userData,setUserData] = useState(null)
    return (
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() } userData={userData} storeUserData={setUserData}/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() } storeUserData={setUserData}/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path="/posts/:postId" element={<PostById navigate={ useNavigate() }/>}/>
        </Routes> 
    );
}


export default App;
