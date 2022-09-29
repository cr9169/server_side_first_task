import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import People from './components/people/people';
import Groups from './components/groups/groups';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <div id="links">
            <Link to="/people"> 
              <button className="app-button" role="button">People</button>
            </Link>
            <Link to="/groups">
              <button className="app-button" role="button">Groups</button>
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/people" element={<People/>}/>
          <Route path="/groups" element={<Groups/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
