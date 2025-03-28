import { useEffect, useState } from "react";
import "./App.css";
import conf from "./conf/conf";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.js";
import { login, logOut } from "./features/authSlice.js";
import { Header, Footer } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logOut());
        }
      })
      .finally(() => setLoading(false));
  }, []);


  return !loading ? (
    <div className="w-full h-auto bg-gray-400 text-center flex flex-col justify-between">
      <div className="w-full bg-black text-white px-5 py-8">
        <Header />
      </div>
      <main><Outlet/></main>
      <div className="w-full bg-slate-800 text-white p-10">
        <Footer />
      </div>
    </div>
  ) : (
    <div>
      <h4>Hold on <br/> Loading data ...</h4>
    </div>
  );
}

export default App;
