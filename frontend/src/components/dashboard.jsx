import "../styles/dashboard.css";
import shortUrl from "../middleware/url";
import { useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  let image =
    "https://images.unsplash.com/photo-1726333629906-9a52575d4b78?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  let [url, setUrl] = useState("");
  let isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log(isAuthenticated)
  let [info, setInfo] = useState(null)
  const handleSubmit = async () => {
    if (!url) {
      setInfo("Please enter the valid url");
      setTimeout(()=> setInfo(null), 2000)
      return;
    }
    const res = await shortUrl(url);
    setInfo(`short url is created successfully ${res}`)
  };

  return (
    <div className="flex justify-center items-center pt-60 font-muli box">
      <div
        className="image absolute h-full w-full top-0 left-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${image}")` }}
      ></div>
      <div className="w-[60vw] z-[10]">
        <h1 className="text-3xl font-bold text-center tracking-[2px] text-white">
          Welcome to Url Shortner
        </h1>
        {info && (<p className="text-orange-500 font-bold bg-white text-center p-3 rounded-md text-base my-5" >{info}</p>)}
        <div className={`dashboard bg-white rounded-lg p-5 w-full flex justify-center flex-col shadow-md shadow-slate-600 h-56 ${info ? 'mt-6' : 'mt-20'}`}>
          <p className="text-lg font-bold font-muli tracking-wide">
            Enter your Url to short it:
          </p>
          <div className="input-box mt-5 flex items-center justify-center">
            <input
              className="w-full p-2 rounded-xl text-xl"
              type="text"
              name="source_url"
              id="source_url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              className="short inline-flex items-center px-12 py-3 bg-black text-white ml-2 text-lg rounded-lg"
              onClick={handleSubmit}
            >
              Short<i className="fas fa-link ml-1"></i>
            </button>
          </div>
          {!isAuthenticated && (<p className="mt-4 text-sm">
            Login to see your shorted url list. <a href="/login">Login</a>
          </p>)}
        </div>
        <h2 className="mt-56 text-3xl font-bold text-white text-center">
          <i className="fas fa-hand-point-right text-orange-400"></i> Your
          Shorted Url List <i className="fas fa-link ml-1"></i>
        </h2>
        <div className="history my-10">
          <div className="entry">
            <h2>1</h2>
            <div className="entry-detail">
              <p>
                <span>Short Url: </span>https://localhost://800/fheifi3
              </p>
              <i className="fas fa-arrow-right"></i>
              <p>
                <span>Redirect To:</span>https://google.com
              </p>
            </div>
          </div>

          <div className="entry">
            <h2>1</h2>
            <div className="entry-detail">
              <p>
                <span>Short Url: </span>https://localhost://800/fheifi3
              </p>
              <i className="fas fa-arrow-right"></i>
              <p>
                <span>Redirect To:</span>https://google.com
              </p>
            </div>
          </div>

          <div className="entry">
            <h2>1</h2>
            <div className="entry-detail">
              <p>
                <span>Short Url: </span>https://localhost://800/fheifi3
              </p>
              <i className="fas fa-arrow-right"></i>
              <p>
                <span>Redirect To:</span>https://google.com
              </p>
            </div>
          </div>

          <div className="entry">
            <h2>1</h2>
            <div className="entry-detail">
              <p>
                <span>Short Url: </span>https://localhost://800/fheifi3
              </p>
              <i className="fas fa-arrow-right"></i>
              <p>
                <span>Redirect To:</span>https://google.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
