import React, { useState, useEffect } from "react";
import burnBook from './../../burnbook.png';

const LogInForm = ({ navigate, storeUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (
      window.localStorage.getItem("token") &&
      window.localStorage.getItem("token") !== "undefined"
    ) {
      navigate("/posts");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password })
    })



    if (response.status !== 201) {
      console.log("yay");
      navigate("/login");
    } else {
      console.log("oop");
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      storeUserData(data.user);
      window.localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/posts");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <form onSubmit={handleSubmit} className="h-screen bg-blue-200 flex items-center">
    <div className="w-full max-w-md mx-auto">
    <img src={burnBook} style={{ display: 'block', margin: 'auto' }} />
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email"></label>
        <input
          className="shadow appearance-none border rounded-lg w-full text-center py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password"></label>
        <input
          className="shadow appearance-none border text-center rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="flex justify-center">
        <input
          role="submit-button"
          id="submit"
          type="submit"
          value="Log In"
          className="w-full rounded-md w-1/2 bg-red-400 py-2 px-3 text-sm font-semibold text-white shadow hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 mb-2"
        />
      </div>
      <div className="flex justify-center">
        <input
          role="signup-button"
          id="signup"
          type="button"
          value="Sign Up"
          onClick={handleSignUp}
          className="w-full rounded-md w-1/2 bg-red-400 py-2 px-3 text-sm font-semibold text-white shadow hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        />
      </div>
    </div>
  </form>
  );
};

export default LogInForm;
