import "../styles/dashboard.css";
import { shortUrl } from "../middleware/url";
import { useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  let [url, setUrl] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let token = useSelector((state) => state.auth.token);

  const handleSubmit = async () => {
    if (!url) {
      alert("Please enter the valid url");
      return;
    }
    const res = await shortUrl(url, token);
    alert(`short url is created successfully ${res}`);
    window.location.reload();

  };

  return (
    <div className="dashboard-container">
      <div className="image"></div>
      <div className="w-[50vw] z-10">
        <h1 className="header-title">Welcome to Url Shortner</h1>
        <div className="dashboard">
          <p className="description">Enter your Url to short it</p>
          <div className="input-box">
            <input
              className="input"
              type="text"
              name="source_url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className="shortBtn" onClick={handleSubmit}>
              Short<i className="fas fa-link ml-1"></i>
            </button>
          </div>
          {!isAuthenticated ? (
            <p className="mt-4 text-sm">
              Login to see your shorted url list.{" "}
              <a href="/login" className="font-bold">
                Login
              </a>
            </p>
          ) : (
            <p className="mt-4 text-sm">
              Scroll Down to checkout your previous history
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
