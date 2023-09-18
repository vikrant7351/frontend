import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registerpage from './component/Register';
import LoginPage from './component/login';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={ <LoginPage/>}/>
        <Route path='/Registerpage' element={<Registerpage/>}/>

    </Routes>
  </Router>
  );
}

export default App;
