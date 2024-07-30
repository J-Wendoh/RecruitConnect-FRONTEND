import React from 'react';
import './App.css';
import Logout from './Logout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
