import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./component/Home";
import Toss from "./component/Toss";

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/toss" exact component={Toss} />
      {/* <Redirect path="*" to="/" /> */}
    </Switch>
  </BrowserRouter>
);

export const apiUrl = "http://localhost:8080";

export default App;
