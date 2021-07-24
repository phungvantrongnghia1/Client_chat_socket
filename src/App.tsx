import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import "./App.css";
import Register from "./components/Register/Register";
import Chat from "./components/Chat/Chat";
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/chat" exact component={Chat} />
      </Router>
    </div>
  );
}

export default App;
