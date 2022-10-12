import { useState } from 'react';
import IGroup from './interfaces/groupInterface';
import IPerson from './interfaces/personInterface';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import People from './components/people/people';
import Groups from './components/groups/groups';
import './App.css';

function App() {

  const [peopleList, setPeopleList] = useState<IPerson[]>([]);
  const [groupsList, setGroupsList] = useState<IGroup[]>([]);
  


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
          <Route path="/people" element={<People peopleList={peopleList} setPeopleList={setPeopleList} groupsList={groupsList} setGroupsList={setGroupsList}/>}/>
          <Route path="/groups" element={<Groups peopleList={peopleList} setPeopleList={setPeopleList} groupsList={groupsList} setGroupsList={setGroupsList}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
