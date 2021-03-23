import React from "react";
import { useRouteMatch } from "react-router";
import { Route } from "react-router-dom";
import TossOnetime from "../component/TossOnetime";
import TossPhone from "../component/TossPhone";
import TossSubscription from "../component/TossSubscription";
import TossVBank from "../component/TossVBank";

const TossRoute: React.FC = (props) => {
  const match = useRouteMatch();

  return (
    <>
      <Route path={`${match.path}/vbank`} exact component={TossVBank} />
      <Route path={`${match.path}/phone`} exact component={TossPhone} />
      <Route path={`${match.path}/onetime`} exact component={TossOnetime} />
      <Route
        path={`${match.path}/subscription`}
        exact
        component={TossSubscription}
      />
    </>
  );
};

export default TossRoute;
