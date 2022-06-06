import "./Layout.css";
import { Grid } from "@material-ui/core";
import Registration from "../registration/Registration";
import Footer from "../footer/Footer";
import Login from "../login/Login";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../header/Header";

import AdminPage from "../admin/AdminPage";
import AddVacation from "../AddVacation";
import Customer from "../customer/Customer";
import EditVacation from "../EditVacation";
import ChartsContainer from "../Charts/ChartsContainer";

function Layout() {
  return (
    <div className="layout">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login">
            <Grid>
              <Login />
            </Grid>
          </Route>
          <Route exact path="/chart">
            <Grid>
              <ChartsContainer />
            </Grid>
          </Route>
          <Route path="/registration">
            <Grid>
              <Registration />
            </Grid>
          </Route>
          <Route path="/admin/addvacation">
            <Grid>
              <AddVacation />
            </Grid>
          </Route>

          <Route path="/editVacation">
            <EditVacation />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route>
            <Route path="/" />
            <Customer />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default Layout;
