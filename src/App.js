import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./components/Responsive.css";
import {
  Navbar, Header, HomePage, Login, Register,
  AddVehicle, RenderData, Terms, Profile, Footer, Favorites
} from "./components/index";

function App() {
  const [load, setLoad] = useState(false)

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

  const Reload = () => {
    window.location.reload()
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
      {(!load &&
        <>
          <Navbar />
          <Routes>
            <Route path="/sumostore" element={<Header />} />
            <Route path="/sumostore/homepage" element={<HomePage index={'0'} />} />
            <Route path="/sumostore/newcar" element={<RenderData type={"newcars"} index={'1'} />} />
            <Route path="/sumostore/motorbikes" element={<RenderData type={"motorbikes"} index={'2'} />} />
            <Route path="/sumostore/oldcars" element={<RenderData type={"oldcars"} index={'3'} />} />
            <Route path="/sumostore/oldmotors" element={<RenderData type={"oldmotors"} index={'4'} />} />
            <Route path="/sumostore/addvehicle" element={<AddVehicle index={'5'} />} />
            <Route path="/sumostore/login" element={<Login index={'6'} />} />
            <Route path="/sumostore/register" element={<Register />} />
            <Route path="/sumostore/terms" element={<Terms />} />
            <Route path="/sumostore/profile" element={<Profile index={'6'} />} />
            <Route path="/sumostore/favorites" element={<Favorites index={'7'} />} />
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
