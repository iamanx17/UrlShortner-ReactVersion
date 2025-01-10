import "../styles/navbar.css";
import { useDispatch } from "react-redux";
import { clearToken } from "../middleware/slice";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const logoutUser = () => {
    dispatch(clearToken());
    navigate("/");
    return;
  };

  return (
    <div className="bg-black text-white p-5 fixed top-0 left-0 w-full text-lg shadow-md shadow-slate-900 z-30">
      <div className="flex items-center justify-around">
        <a href="/">UrlShortner</a>
        <ul className="navbar-list flex items-center">
          <li>
            <a href="/">Dashboard</a>
          </li>
          {isAuthenticated ? (
            <li>
            <button onClick={logoutUser}>Logout</button>
          </li>

          ) : (
            <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>

          )}
          
          
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
