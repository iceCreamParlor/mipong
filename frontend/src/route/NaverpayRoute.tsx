import React from "react";
import { useRouteMatch } from "react-router";
import { Route } from "react-router-dom";
import NaverpayOnetime from "../component/NaverpayOnetime";

const NaverpayRoute: React.FC = (props) => {
  const match = useRouteMatch();

  return (
    <>
      <Route path={`${match.path}/onetime`} exact component={NaverpayOnetime} />
    </>
  );
};

export default NaverpayRoute;
