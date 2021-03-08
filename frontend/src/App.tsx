import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./component/Home";

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      {/* <Redirect path="*" to="/" /> */}
    </Switch>
  </BrowserRouter>
);

export const defaultUrl = "http://localhost:8080";

export default App;
