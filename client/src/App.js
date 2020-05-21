import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import Main from './views/Main';
import NewAuthor from './views/NewAuthor';
import IndividualAuthor from './views/IndividualAuthor';
import EditAuthor from './views/EditAuthor';
import './App.css';
import Axios from 'axios';

function App() {
  const [authors, setAuthors] = useState([]);
  useEffect(() =>{
    Axios.get('http://localhost:8000/api/authors')
      .then(res=>{
        setAuthors(res.data);
      })
  }, [])

  return (
    <div className="App">
      <Router>
        <Main path="/" authors = {authors} setAuthors = {setAuthors}/>
        <IndividualAuthor path="/:id" />
        <EditAuthor path="/:id/edit" setAuthors = {setAuthors} />
        <NewAuthor path="/new" authors = {authors} setAuthors = {setAuthors} />
      </Router>
    </div>
  );
}

export default App;