import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaWindowClose } from "react-icons/fa";
import { AuthContext } from "../../../Contexts/AuthProvider";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <header>
      <nav className="md:flex md:items-center md:justify-between md:place-items-center">
        <div className="flex justify-between place-items-center">
          <Link
            to={"/"}
            className="text-2xl font-[Poppins] cursor-pointer text-red-500 hover:text-red-800"
          >
            Genius Task
          </Link>
          <span
            onClick={() => setOpen(!open)}
            className="md:hidden block text-red-500"
          >
            {open ? <FaWindowClose></FaWindowClose> : <FaBars></FaBars>}
          </span>
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:bg-transparent  left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 bg-[#000000] z-1" : "top-[-490px]"
          }`}
        >
          <li className="mx-4 my-6 md:my-0">
            <Link
              onClick={() => setOpen(!open)}
              to={"/"}
              className="text-sm hover:text-red-700 text-red-500 duration"
            >
              Home
            </Link>
          </li>
          {/* <li className="mx-4 my-6 md:my-0">
            <Link
              onClick={() => setOpen(!open)}
              to={"/about"}
              className="text-sm hover:text-red-700 text-red-500 duration"
            >
              About
            </Link>
          </li> */}

          {user ? (
            <>
              <li className="mx-4 my-6 md:my-0">
                <Link
                  onClick={() => setOpen(!open)}
                  to={"/add-task"}
                  className="text-sm hover:text-red-700 text-red-500 duration"
                >
                  Add Task
                </Link>
              </li>
              <li className="mx-4 my-6 md:my-0">
                <Link
                  onClick={() => setOpen(!open)}
                  to={"/my-task"}
                  className="text-sm hover:text-red-700 text-red-500 duration"
                >
                  My Task
                </Link>
              </li>
              <li className="mx-4 my-6 md:my-0">
                <Link
                  onClick={() => setOpen(!open)}
                  to={"/completed-task"}
                  className="text-sm hover:text-red-700 text-red-500 duration"
                >
                  Completed Task
                </Link>
              </li>
              <li className="mx-4 my-6 md:my-0">
                <Link
                  onClick={() => setOpen(!open)}
                  to={"#"}
                  className="text-sm hover:text-red-700 text-red-500 duration"
                >
                  <img src="" alt="" />
                  {user.displayName }
                </Link>
              </li>
              <button
                onClick={handleLogOut}
                className="text-sm hover:text-red-700 text-red-500 duration"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <li className="mx-4 my-6 md:my-0">
                <Link
                  onClick={() => setOpen(!open)}
                  to={"/login"}
                  className="text-sm hover:text-red-700 text-red-500 duration"
                >
                  Login
                </Link>
              </li>
              <li className="mx-4 my-6 md:my-0">
                <Link
                  onClick={() => setOpen(!open)}
                  to={"/register"}
                  className="text-sm hover:text-red-700 text-red-500 duration"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
