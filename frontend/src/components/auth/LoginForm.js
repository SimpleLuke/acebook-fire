import React, { useState, useEffect } from "react";

const LogInForm = ({ navigate, storeUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
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
      // storeUserData(data.user);
      window.localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/posts");
      window.location.reload();
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
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        id="email"
        type="text"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        placeholder="Password"
        id="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <input role="submit-button" id="submit" type="submit" value="Log In" />
      <input
        role="signup-button"
        id="signup"
        type="button"
        value="Sign Up"
        onClick={handleSignUp}
      />
    </form>
  );
};

export default LogInForm;
