import React from "react";
import { useRouteMatch } from "react-router";
import { Route } from "react-router-dom";
import NaverpayOnetime from "../component/NaverpayOnetime";
import NaverPaySubscription from "../component/NaverPaySubscription";

const NaverpayRoute: React.FC = (props) => {
  const match = useRouteMatch();

  return (
    <>
      <Route path={`${match.path}/onetime`} exact component={NaverpayOnetime} />
      <Route
        path={`${match.path}/subscription`}
        exact
        component={NaverPaySubscription}
      />
    </>
  );
};

export default NaverpayRoute;
