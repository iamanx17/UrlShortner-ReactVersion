import "../styles/dashboard.css";

const Dashboard = () => {
  let image = "https://images.unsplash.com/photo-1726333629906-9a52575d4b78?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div class="flex justify-center items-center pt-60 font-muli bg-gradient-to-r from-zinc-800 to-slate-900">
      <div className="image absolute h-full w-full top-0 left-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${image}")` }}></div>
      <div class="w-[60vw] z-[10]">
        <h1 className="text-3xl font-bold text-center tracking-[2px] text-white">Welcome to Url Shortner</h1>
        <div class="dashboard bg-white rounded-lg p-5 w-full flex flex-col mt-20 shadow-md shadow-slate-600">
            <p className="text-lg font-muli tracking-wide">Enter your Url to short it:</p>
            <div class="input-box mt-5 flex items-center justify-center">
                <input className="w-full p-2 rounded-xl text-xl" type="text" name="source_url" id="source_url" placeholder="https://google.com"/>
                <button className="short px-12 py-3 bg-black text-white ml-2 text-lg rounded-lg">Short</button>
            </div>
        </div>
        <h2 className="mt-64 text-3xl text-white text-center">Your Shorted Url List</h2>
        <div class="history my-10">
          <div class="entry">
            <h2>1</h2>
            <div class="entry-detail">
            <p><span>Short Url: </span>https://localhost://800/fheifi3</p>
            <i class="fas fa-arrow-right"></i>
            <p><span>Redirect To:</span>https://google.com</p>
            </div>      
          </div>

          <div class="entry">
            <h2>1</h2>
            <div class="entry-detail">
            <p><span>Short Url: </span>https://localhost://800/fheifi3</p>
            <i class="fas fa-arrow-right"></i>
            <p><span>Redirect To:</span>https://google.com</p>
            </div>      
          </div>

          <div class="entry">
            <h2>1</h2>
            <div class="entry-detail">
            <p><span>Short Url: </span>https://localhost://800/fheifi3</p>
            <i class="fas fa-arrow-right"></i>
            <p><span>Redirect To:</span>https://google.com</p>
            </div>      
          </div>

          <div class="entry">
            <h2>1</h2>
            <div class="entry-detail">
            <p><span>Short Url: </span>https://localhost://800/fheifi3</p>
            <i class="fas fa-arrow-right"></i>
            <p><span>Redirect To:</span>https://google.com</p>
            </div>      
          </div>

        


        </div>
      </div>
    </div>
  );
};

export default Dashboard;
