import { UserContext} from "./UserContext";
import { useContext } from "react"; // import useContext from React

import { NavLink } from "react-router-dom";
import "./Component.css";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="navBar">
      <div className="container">
        <div className="row">
          <div className="col title">
            <span>
              <img src="../image/c.png" alt="" />
            </span>
            <h2>Summertime Palaces</h2>
          </div>
          <div className="col ">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/room">Room</NavLink>
              </li>
              {!user ? (
                <li>
                  <NavLink to="/logIn">Log In</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink>
                      Hi, <span style={{ color: "#fff" }}>{user}</span>
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
