import React from "react";
import { Route, Switch } from "react-router-dom";
import DynamicImport from "./utils/lazyImport";

const MainPage = DynamicImport(() => import("./components/pages/main"));
const ScheduledPage = DynamicImport(() =>
  import("./components/pages/scheduled")
);
const StudentsPage = DynamicImport(() => import("./components/pages/students"));
const ChartPage = DynamicImport(() => import("./components/pages/chart"));
const NotFoundPage = DynamicImport(() => import("./components/pages/404"));
const NotifyPage = DynamicImport(() => import("./components/pages/notify"));
const StudentDetailPage = DynamicImport(() =>
  import("./components/pages/studentDetail")
);

const RouteMap = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/notify" component={NotifyPage} />
      <Route exact path="/chart" component={ChartPage} />
      <Route exact path="/scheduled" component={ScheduledPage} />
      <Route exact path="/students" component={StudentsPage} />
      <Route exact path="/student/:id" component={StudentDetailPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default RouteMap;
