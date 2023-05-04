import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import About from "./components/About/About";
import NotFound from "./components/NotFound/NotFound";
import Create from "./components/Create/Create";
import View from "./components/View/View";
import Edit from "./components/Edit/Edit";
function App() {
  return (
      <div >
        <Router>
          <NavBar/>
          <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
              integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
              crossOrigin="anonymous"
          />
          <Routes>
            <Route exact path='/' element={
              <Home/>
            }>
            </Route>
            <Route exact path='/view/:set' element={
              <View/>
            }>
            </Route>
            <Route path='/about' element ={
              <About/>
            }>
            </Route>
            <Route path='/create' element ={
              <Create/>
            }>
            </Route>
            <Route path='/edit/:set' element={
              <Edit/>
            }>

            </Route>
            <Route path='*' element={<NotFound/>}>
            </Route>
          </Routes>
        </Router>
      </div>

  );
}

export default App;
