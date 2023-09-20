import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registerpage from './component/Register';
import LoginPage from './component/login';
import Profile from './component/profile';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={ <LoginPage/>}/>
        <Route path='/Registerpage' element={<Registerpage/>}/>
        <Route path='/Profile' element={<Profile/>}/>

    </Routes>
  </Router>
  );
}

export default App;
