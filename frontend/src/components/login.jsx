import { useState } from "react";
import "../styles/form.css";
import {loginAPi} from '../middleware/user';
import { useDispatch } from "react-redux";
import { setToken } from "../middleware/slice";

const Login = () => {
  let image ="https://images.unsplash.com/photo-1726333629906-9a52575d4b78?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  let [info, setInfo] = useState(null);
  const dispatch = useDispatch();

  const handleLogin = async (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    const res = await loginAPi(email, password);
    if (rest && res.access_token){
      dispatch(setToken(res.access_token))
    }
    
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen font-muli">
      <div
        className="image absolute h-screen w-screen top-0 left-0 bg-cover bg-center bg-no-repeat z-[-1]"
        style={{ backgroundImage: `url("${image}")` }}
      ></div>
      {info && (<p className="text-orange-500 font-bold bg-white text-center p-3 rounded-md text-base my-5" >{info}</p>)}
      <form onSubmit={handleLogin} className="bg-white rounded-xl w-[500px] text-lg py-3 px-5 shadow-md shadow-slate-700 mt-20">
        <h1 className="text-center my-5 text-2xl font-bold tracking-[2px]">
          Login here
        </h1>
        <div className="form-control">
          <div className="form-item">
            <label for="Email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div className="form-control">
          <div className="form-item">
            <label for="Password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn bg-black text-white w-full my-5">Login</button>
        <p className="text-base text-center">Not have an account? <a href="/register" className="font-bold">Register</a></p>

      </form>
    </div>
  );
};

export default Login;
