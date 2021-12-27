import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { handleNavLink } from "./components/HandleEvent"
import { UserProvider } from "./components/UserContext/UserContext"
import { FavoritesProvider } from "./components/FavoritesContext/FavoritesContext"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

(() => {
  handleNavLink()
})()