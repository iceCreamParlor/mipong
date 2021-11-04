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
import TossRoute from "./route/TossRoute";
import NaverpayRoute from "./route/NaverpayRoute";
import KakaoRoute from "./route/KakaoRoute";

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/kakaopay" component={KakaoRoute} />

      <Route path="/toss" component={TossRoute} />
      <Route path="/naverpay" component={NaverpayRoute} />

      <Route path="/orderComplete" exact component={OrderComplete} />

      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>
);

// export const apiUrl = "https://dev.wiselycompany.com:3000";
export const apiUrl = "https://n-api-dev.wiselycompany.com";

export default App;
