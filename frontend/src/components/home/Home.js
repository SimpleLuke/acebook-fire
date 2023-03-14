import React, { useEffect } from 'react';

const Home = ({ navigate }) => {
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/posts");
    }else{
      navigate("/login");
    }
  }, []);
}

export default Home;