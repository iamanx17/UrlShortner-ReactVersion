import "../styles/form.css";
import { registerAPI } from "../middleware/user";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let firstName = data.get("first_name");
    let lastName = data.get("last_name");
    let email = data.get("email");
    let password1 = data.get("password1");
    let password2 = data.get("password2");
    if (password1 != password2) {
      alert("Password not matched");
      return;
    }
    const res = await registerAPI(email, password1, firstName, lastName);
    if (res) {
      alert('register was successful')
      navigate("/login");
      return;
    }
  };
  return (
    <div className="flex items-center justify-center h-screen font-muli">
      <div className="image z-[-1]"></div>
      <form onSubmit={handleRegister} className="register-form">
        <h1 className="register-title">Register Your Self</h1>
        <div className="form-control">
          <div className="form-item">
            <label htmlFor="First Name">First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-item">
            <label htmlFor="Last Name">Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Enter your last name"
            />
          </div>
        </div>
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
              name="password1"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="Confirm Password">Confirm Password</label>
            <input
              type="password"
              name="password2"
              placeholder="Confirm password"
              required
            />
          </div>
        </div>
        <button type="submit" className="register-btn">
          Register
        </button>
        <p className="text-base text-center">
          Already have an account?{" "}
          <a href="/login" className="font-bold">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
