import React, { useState, useEffect } from "react";


const SignUpForm = ({ navigate }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  return (
    <div className="bg-cover bg-no-repeat min-h-screen bg-body-background2">
    <div className="w-1/2 mx-auto p-8 rounded-lg">
      <div className="flex min-h-full">
            <div className="flex flex-1 flex-col justify-center py-8 px-2 lg:px-6 lg:flex-none lg:px-12 xl:px-16 bg-gray-50 rounded-2xl -translate-x-64 border border-gray-200 shadow-md">
              <div className=" mx-auto w-full max-w-lg lg:w-96">
                <div>
                  <img
                    className="items-center h-auto w-auto"
                    src="./burnbook.png"
                    alt="burn-book"
                  />
                  <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-red-400">Sign Up</h2>
                  
                </div >
                <div className="flex flex-col justify-center p-4 mt-6">
                  

                  <form className="my-auto" onSubmit={handleSubmit}>
                  
                  <div>
                    <div className="mt-2">
                      <input
                        className=" text-center block w-full rounded-lg border-0 py-1.5 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 lg:text-lg lg:leading-6"
                        placeholder="First Name"
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mt-2">
                      <input
                        className="text-center block w-full rounded-lg border-0 py-1.5 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 lg:text-lg lg:leading-6"
                        placeholder="Last Name"
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={handleLastNameChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mt-2">
                      <input
                        className="text-center block w-full rounded-lg border-0 py-1.5 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 lg:text-lg lg:leading-6"
                        placeholder="Email"
                        id="email"
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      className="text-center block w-full rounded-lg border-0 py-1.5 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 lg:text-lg lg:leading-6"
                      placeholder="Password"
                      id="password"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  
                  <div class="mt-2" >
                    <input 
                      className=" flex w-full justify-center rounded-lg bg-red-400 py-2 px-3 text-lg font-semibold text-white shadow-lg hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      id="submit" 
                      type="submit" 
                      value="Submit"
                    />
                    
                  </div>
            
                </form>
            


                </div>
              </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block flex min-h-full">
                 
            </div>
          </div>
        </div>  
    </div>

    
  );
};

export default SignUpForm;
