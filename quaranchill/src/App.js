import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";


import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/noMatch" component={NoMatch} />
      </Router>
    );
  }
}

export default App;
