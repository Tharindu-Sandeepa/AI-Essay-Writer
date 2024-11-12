// src/App.js

import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EssayGenerator from "./pages/EssayGenerator.js"; // Import the EssayGenerator component
import "./App.css";
import FooterComponent from "./components/FooterComponent.js";
import AppBar from "./components/AppBar.js";
import HomePage from "./pages/HomePage.js";

function App() {
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Router>
      <div>
        <AppBar scrollToFooter={scrollToFooter} />
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/essay-generator" element={<EssayGenerator />} />
          {/* Add more routes as needed */}
        </Routes>
        <FooterComponent ref={footerRef} />
      </div>
    </Router>
  );
}

export default App;