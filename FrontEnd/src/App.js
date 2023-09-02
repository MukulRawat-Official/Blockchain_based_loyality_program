import './App.css';
import { BrowserRouter as Router, Routes,Route, useLocation } from 'react-router-dom';
import React, {useEffect, useState} from 'react'
import Header from './components/header';
import RouteMap from './Routes';




function App() {
  // const location = window.location.href;
  const [location,setLocation]=useState();

  useEffect(()=>{
    setLocation(window.location.pathname)
  })

  // alert(location.split('/').at(3)=="admin")
  const appStyle = {
    backgroundColor: '#f0f0f0', // Set your desired background color
  };
  
  return (
    <div style={appStyle} >
      <Router>
      {!location===`/admin/*` &&
       
        <Header />
      }
          
        <RouteMap/>
      </Router>
        
              
    </div>
  );
}

export default App;
