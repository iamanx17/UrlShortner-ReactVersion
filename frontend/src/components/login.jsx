import "../styles/form.css";
import { loginAPi } from "../middleware/user";
import { useDispatch } from "react-redux";
import { setToken } from "../middleware/slice";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await loginAPi(email, password);
    if (res) {
      alert("Login successful");
      dispatch(setToken(res));
      navigate("/");
      return;
    }
  };
  return (
    <div className="login-container">
      <div className="image z-[-1]"></div>
      <form onSubmit={handleLogin} className="login-form">
        <h1 className="login-title">Login here</h1>
        <div className="form-control">
          <div className="form-item">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div className="form-control">
          <div className="form-item">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>
        </div>
        <button type="submit" className="login-btn">Login</button>
        <p className="text-base text-center">
          Not have an account?{" "}
          <a href="/register" className="font-bold">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
