import React, { useState } from 'react';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();



    // const users = await fetch(`/users?email=${email}`, {
    //   method: 'get',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    
    // const user = await users.json();
    
    // const firstName = user.firstName;
    

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })



    if(response.status !== 201) {
      console.log("yay")
      navigate('/login')
    } else {
      console.log("oop")
      let data = await response.json()
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("firstName", data.firstName);
      window.localStorage.setItem("lastName", data.lastName);
      console.log()
      navigate('/posts');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSignUp = () => {
    navigate('/signup')
  }


    return (
      <form onSubmit={handleSubmit}>
        <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
        <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <input role='submit-button' id='submit' type="submit" value="Log In" />
        <input role='signup-button' id='signup' type="button" value="Sign Up" onClick={handleSignUp} />
      </form>

    );
}

export default LogInForm;
