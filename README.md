<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img width="861" alt="image" src="https://user-images.githubusercontent.com/89473016/231215882-f80cb52b-6891-40fe-b966-b19c42035392.png">

  <h3 align="center">Burnbook</h3>
  
  This is a project required developers to work on an existing application. Read the original [README](https://github.com/makersacademy/acebook-mern-template)
   
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#start">Start</a></li>
        <li><a href="#test">Test</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#future-roadmap">Future roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Burnbook is a social platform for sharing your daily highlights.

Users can sign up, make a post, upload a photo, and like or comment posts from other users.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- React
- React Router
- Axios
- Node.js
- Express.js
- JWT
- MongoDB
- Tailwind
- HeadlessUI
- Cypress
- Jest

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/SimpleLuke/acebook-fire.git
   ```
2. Install NPM packages
   ```sh
   cd frontend/
   npm install
   cd api/
   npm install
   ```
3. Install MongoDB

   ```
   brew tap mongodb/brew
   brew install mongodb-community@5.0
   ```

4. Start MongoDB
   ```
   brew services start mongodb-community@5.0
   ```

### Start

1. Start the frontend server

   ```
   cd frontend/
   npm start
   ```

2. Start the backend server

   ```
   cd api/
   JWT_SECRET=SUPER_SECRET npm start
   ```

3. Browse to [http://localhost:3000](http://localhost:3000)

### Test

- Note the use of an environment variable for the JWT secret

- Start the server in test mode (so that it connects to the test DB)

  ```
  cd api
  JWT_SECRET=SUPER_SECRET npm run start:test
  ```


- Run frontend tests

  ```
  cd frontend/
  JWT_SECRET=SUPER_SECRET npm start
  JWT_SECRET=SUPER_SECRET npm run test
  ```

- Run backend tests
  ```
  cd api/
  JWT_SECRET=SUPER_SECRET npm run test
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

- Sign up an account
  ![image](https://user-images.githubusercontent.com/89473016/231218822-c4230c74-5c84-4d70-87a0-f738f0f70f01.png)

- Make a post
  ![image](https://user-images.githubusercontent.com/89473016/231219603-680e2f37-e653-4c66-a432-88e39534347f.png)
  
- Upload a photo
![image](https://user-images.githubusercontent.com/89473016/231220307-d13eeefb-0440-466f-b070-4ffba0f083c7.png)

- Like a post
  ![image](https://user-images.githubusercontent.com/89473016/231220106-2dcf0215-4cf3-458a-a639-411d713bc52f.png)

- Leave a comment
  ![image](https://user-images.githubusercontent.com/89473016/231220596-d677768d-d616-41b8-a79d-e0e2839913fc.png)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Future roadmap

- [ ] Deploy the site

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions make the open-source community a fantastic place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion to improve this, please fork the repo and create a pull request. You can also open an issue with the tag "enhancement".
Remember to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- Anna Magnusson - [LinkedIn](https://www.linkedin.com/in/anna-magnusson-519658199/) 
- Cassius Naylor - [LinkedIn](https://www.linkedin.com/in/cassius-naylor/) 
- James Mcleish - [LinkedIn](https://www.linkedin.com/in/james-mcleish-049446217/) 
- Luke Lai - [LinkedIn](https://www.linkedin.com/in/luke-lai-309a3522b/) 
- Sameera Sood - [LinkedIn](https://www.linkedin.com/in/sameera-sood-b3051218/) 
- Shamima Begum - [GitHub](https://github.com/Shamima14)

Project Link: [**[acebook-fire](https://github.com/SimpleLuke/acebook-fire)**]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Makers](https://makers.tech/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TailwindUI](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)
- [Heroicons](https://heroicons.com/)
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
