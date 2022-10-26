import { useState, useEffect } from 'react';
import IGroup from './interfaces/groupInterface';
import IPerson from './interfaces/personInterface';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import People from './components/people/people';
import Groups from './components/groups/groups';
import { PersonService } from './services/personService';
import { GroupService } from './services/groupService';
import './App.css';

function App() {

  const [peopleList, setPeopleList] = useState<IPerson[]>([]);
  const [groupsList, setGroupsList] = useState<IGroup[]>([]);
  
  const fetchData = async () => {
    setPeopleList(await PersonService.getAllPeople());
    setGroupsList(await GroupService.getAllGroups());
  }   

  useEffect( () => {
      fetchData();
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <div id="links">
            <Link to="/people"> 
              <button className="app-button">People</button>
            </Link>
            <Link to="/groups">
              <button className="app-button">Groups</button>
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
