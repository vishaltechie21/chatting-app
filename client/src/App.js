import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Join from './component/Join/Join';
import Chat from './component/Chat/Chat';
// import Login from './component/Login/Login'; // Uncomment if needed

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Join />} />
          <Route path='/Chat'  element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
