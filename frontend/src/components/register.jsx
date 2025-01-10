import { useState } from "react";
import "../styles/form.css";
import { registerAPI } from "../middleware/user";

const Register = () => {
  let image = "https://images.unsplash.com/photo-1726333629906-9a52575d4b78?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  let [info, setInfo] = useState(null);
  
  const handleRegister = async (e)=>{
    e.preventDefault();
    const data = new FormData(e.target)
    let firstName = data.get('first_name')
    let lastName = data.get('last_name')
    let email = data.get('email')
    let password1 = data.get('password1')
    let password2 = data.get('password2')
    if(password1!=password2){
      setInfo('Password not matched!')
      setTimeout(()=> setInfo(null), 2000)
      return
    }
    const res = await registerAPI(email, password1, firstName, lastName);
    console.log(res);

  }
  return (
    <div className="flex items-center justify-center h-screen font-muli">
      <div className="image absolute h-screen w-screen top-0 left-0 bg-cover bg-center bg-no-repeat z-[-1]" style={{ backgroundImage: `url("${image}")` }}></div>
      <form onSubmit={handleRegister} className="bg-white rounded-xl w-[500px] text-lg py-3 px-5 shadow-md shadow-slate-700 mt-20">
        <h1 className="text-center my-5 text-2xl font-bold tracking-[2px]">Register Your Self</h1>
        <div className="form-control">
            <div className="form-item">
                <label for="First Name">First Name</label>
                <input type="text" name="first_name" id="first_name" placeholder="Enter your first name"/>
            </div>
            <div className="form-item">
                <label for="Last Name">Last Name</label>
                <input type="text" name="last_name" id="last_name" placeholder="Enter your last name"/>
            </div>
        </div>
        <div className="form-control">
            <div className="form-item">
                <label for="Email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter your email" required/>
            </div>
        </div>
        <div className="form-control">
            <div className="form-item">
                <label for="Password">Password</label>
                <input type="password" name="password1" id="password1" placeholder="Enter password" required/>
            </div>
            <div className="form-item">
                <label for="Confirm Password">Confirm Password</label>
                <input type="password" name="password2" id="password2" placeholder="Confirm password" required/>
            </div>
        </div>
        <button type="submit" className="btn bg-black text-white w-full my-5">Register</button>
        <p className="text-base text-center">Already have an account? <a href="/login" className="font-bold">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
