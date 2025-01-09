import "../styles/navbar.css";

const Navbar = () => {
  return (
    <div className="bg-black text-white p-5 fixed top-0 left-0 w-full text-lg shadow-md shadow-slate-900 z-30">
      <div className="flex items-center justify-around">
        <a href="/">UrlShortner</a>
        <ul className="navbar-list flex items-center">
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
