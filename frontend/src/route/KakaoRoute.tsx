import React from "react";
import { useRouteMatch } from "react-router";
import { Route } from "react-router-dom";
import Kakao from "../component/Kakao";
import TossSubscription from "../component/TossSubscription";

const KakaoRoute: React.FC = (props) => {
  const match = useRouteMatch();

  return (
    <>
      <Route
        path={`${match.path}/onetime`}
        exact
        // component={TossSubscription}
        render={(props) => <Kakao type={"onetime"} />}
      />
      <Route
        path={`${match.path}/subscription`}
        exact
        render={(props) => <Kakao type={"subscription"} />}
      />
    </>
  );
};

export default KakaoRoute;
