import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import DynamicImport from "./utils/lazyImport";

const MainPage = DynamicImport(() => import("./components/pages/main"));
const ScheduledPage = DynamicImport(() =>
  import("./components/pages/scheduled")
);
const StudentsPage = DynamicImport(() => import("./components/pages/students"));
const ChartPage = DynamicImport(() => import("./components/pages/chart"));
const LoginPage = DynamicImport(() => import("./components/pages/login"));
const NotFoundPage = DynamicImport(() => import("./components/pages/404"));
const NotifyPage = DynamicImport(() => import("./components/pages/notify"));
const NotifyManagementPage = DynamicImport(() =>
  import("./components/pages/notifyManagement")
);
const StudentDetailPage = DynamicImport(() =>
  import("./components/pages/studentDetail")
);
const DailyReportBookPage = DynamicImport(() =>
  import("./components/pages/dailyReportBook")
);

const RouteMap = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/notify/ph" component={NotifyPage} />
      <Route exact path="/notify/gv" component={NotifyPage} />
      <Route exact path="/chart" component={ChartPage} />
      <Route exact path="/scheduled" component={ScheduledPage} />
      <Route exact path="/students" component={StudentsPage} />
      <Route exact path="/notifies" component={NotifyManagementPage} />
      <Route exact path="/add-report" component={DailyReportBookPage} />
      <Route exact path="/student/:id" component={StudentDetailPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default RouteMap;
