import logo from './burnbookLogo.png';

const Navbar = ({ navigate, userData, storeUserData }) => {
  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userData");
    storeUserData("");
    navigate("/login");
  };

  return (
    <div className="sticky top-0">
<nav className="sticky fixed top-0 h-16 p2 pt-9 pb-9 mx-auto place-content-between relative flex px-5 flex bg-red-200 flex items-center">
      <div
        className="w-48 text-lg text-white cursor-pointer"
        data-cy="homeButton"
        onClick={() => navigate("/posts")}
      >
        <img src={logo} alt="LogoIcon" />
      </div>
      <div className="flex justify-between">
      <div className="p-2 right-0 text-lg text-red-500 cursor-default " data-cy="user-first-name">
        {userData ? userData.firstName : ""}
      </div>
      <div
        className="p-2 px-4 left-0 text-white cursor-pointer hover:bg-red-500 relative ml-3 flex rounded-3xl bg-red-400  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        // text-sm
        //className="p-3 text-lg cursor-pointer border rounded-t bg-yellow-300 hover:bg-yellow-600"
        data-cy="logoutButton"
        onClick={logout}
      >
        Log out
      </div>
      </div>
      
    </nav>
    </div>
    
  );
};

export default Navbar;
