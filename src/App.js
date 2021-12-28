import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./components/Responsive.css";
import {
  Navbar, Header, HomePage, Login, Register,
  AddVehicle, RenderData, Terms, Profile, Footer, Favorites
} from "./components/index";

function App() {
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('user') === null || localStorage.getItem('favorites') === null) {
      localStorage.setItem('user', JSON.stringify({
        id: '',
        avatar: '',
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        auth: false
      }))
      localStorage.setItem('favorites', JSON.stringify([]))
      setLoad(true)
    }
  }, [])


  const Reload = () => {
    window.location.reload()
    return (
      <div className="spinner">
        <RingLoader color={"#A38D65"} size={70} />
        <h3>Loading...</h3>
      </div>
    )
  }

  return (
    <div className="App">
      {(!load &&
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/homepage" element={<HomePage index={'0'} />} />
            <Route path="/newcar" element={<RenderData type={"newcars"} index={'1'} />} />
            <Route path="/motorbikes" element={<RenderData type={"motorbikes"} index={'2'} />} />
            <Route path="/oldcars" element={<RenderData type={"oldcars"} index={'3'} />} />
            <Route path="/oldmotors" element={<RenderData type={"oldmotors"} index={'4'} />} />
            <Route path="/addvehicle" element={<AddVehicle index={'5'} />} />
            <Route path="/login" element={<Login index={'6'} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/profile" element={<Profile index={'6'} />} />
            <Route path="/favorites" element={<Favorites index={'7'} />} />
          </Routes>
          <Footer />
        </>)
        ||
        <Reload />
      }
    </div>
  );
}

export default App;
