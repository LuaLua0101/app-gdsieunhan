import React from "react";
import { Route, Switch } from "react-router-dom";
import DynamicImport from "./utils/lazyImport";

const MainPage = DynamicImport(() => import("./components/pages/main"));
const ChartPage = DynamicImport(() => import("./components/pages/chart"));
const NotFoundPage = DynamicImport(() => import("./components/pages/404"));

const RouteMap = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/chart" component={ChartPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default RouteMap;
