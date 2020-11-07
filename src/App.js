import React from 'react';
import Menu from './components/Menu'
import Form from './components/Form'
import Navbar from './components/Navbar'
import About from "./components/About"
import Calculator from "./components/Calculator"
import "./App.css";

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Route path="/" component={Navbar} />
      <Route exact path="/" component={Menu} />
      <Route path="/form" component={Form} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/about" component={About} />
    </Router>
  );
}

export default App;
