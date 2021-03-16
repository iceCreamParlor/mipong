import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./component/Home";
import Toss from "./component/TossOnetime";
import Kakao from "./component/Kakao";
import OrderComplete from "./component/OrderComplete";
import TossSubscription from "./component/TossSubscription";
import TossVBank from "./component/TossVBank";
import TossPhone from "./component/TossPhone";

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/kakao" exact component={Kakao} />
      <Route path="/toss/vbank" exact component={TossVBank} />
      <Route path="/toss/phone" exact component={TossPhone} />
      <Route path="/toss/onetime" exact component={Toss} />
      <Route path="/toss/subscription" exact component={TossSubscription} />
      <Route path="/orderComplete" exact component={OrderComplete} />

      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export const apiUrl = "http://localhost:8080";

export default App;
