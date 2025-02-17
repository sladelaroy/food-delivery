import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import List from "./pages/List";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export const backendUrl = import.meta.env.VITE_FRONTEND_URL

function App() {
  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
