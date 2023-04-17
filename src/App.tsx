import React from "react";
import "./App.css";
import { Dashboard, Filters, MovieModal } from "./containers";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="global-wrapper">
        <Filters />
        <Dashboard />
      </div>
      <MovieModal />
    </BrowserRouter>
  );
}

export default App;
