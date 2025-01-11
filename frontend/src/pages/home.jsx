import Navbar from "../components/navbar";
import Dashboard from "../components/dashboard";
import History from "../components/urlhistory";
import { useSelector } from "react-redux";

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <>
      <Navbar />
      <Dashboard />
      {token && <History token={token} />}
    </>
  );
};

export default Home;
