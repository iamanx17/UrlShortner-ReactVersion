import "../styles/history.css";
import { useEffect, useState } from "react";
import { fetchAllShortUrl } from "../middleware/url";
import CONSTANTS from "../constants";

const History = ({ token }) => {
  let [entry, setEntry] = useState([]);
  useEffect(() => {
    if (!token) return;
    const callApi = async () => {
      const urllist = await fetchAllShortUrl(token);
      if (urllist) {
        const entries = urllist.map((url, idx) => (
          <div className="entry" key={idx}>
            <h2>{idx + 1}</h2>
            <div className="entry-detail">
              <p>
                <strong>Short Url: </strong>
                {`${CONSTANTS.baseUrl}/${url.shortId}`}
              </p>
              <span><i className="fas fa-arrow-right"></i></span>
              <p>
                <strong>Redirect To: </strong>
                {url.source}
              </p>  
            </div>
          </div>
        ));
        setEntry(entries);
      }
    };
    callApi();
  }, [token]);

  return (
    <div class="history-section">
      <div class="w-[60vw]">
        <h2 className="mt-20 text-3xl font-bold text-white text-center">
          <i className="fas fa-hand-point-right text-orange-400"></i> Your
          ShortedUrl List <i className="fas fa-link ml-1"></i>
        </h2>
        <div className="history my-10">{entry.length>0 ? entry : (<p className="text-white text-center text-lg">Please short any url to view the list here</p>)}</div>
      </div>
    </div>
  );
};

export default History;
