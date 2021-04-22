import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Div from "../../app/common/Div/Div";

import Grid from "../../app/components/Grid/Grid";
import SideBar from "../../features/SideBar/SideBar";
import Login from "../../features/Login/Login";

import Customers from "../../features/Customers/Customers/Customers";
import Customer from "../../features/Customers/Customer/Customer";
import RegisterCustomer from "../../features/Customers/RegisterCustomer/RegisterCustomer";

import Workers from "../../features/Workers/Workers/Workers";
import Worker from "../../features/Workers/Worker/Worker";
import RegisterWorker from "../../features/Workers/RegisterWorker/RegisterWorker";

import Selling from "../../features/Sellings/Sellling/Selling";
import Sellings from '../../features/Sellings/Sellings/Sellings'

import RateSettings from "../../features/Settings/RateSettings/RateSettings";
import AppSettings from "../../features/Settings/AppSettings/AppSettings";

import Orders from "../../features/Order/Orders/Orders";
import Order from "../../features/Order/Order/Order";

import WorkShop from '../../features/WorkSpace/WorkSpace'

import { fetchCustomers } from "../../features/Customers/customerActions";
import { fetchWorkers } from "../../features/Workers/workerActions";
import { fetchOrders } from "../../features/Order/orderActions";
import {
  fetchOrderItems,
  fetchSellingItems,
  fetchRates
} from "../../features/Settings/settingActions";
import { fetchSellings } from "../../features/Sellings/sellingActions";
class App extends Component {
  handelBack = () => {
    this.props.history.goBack()
  }
  componentDidMount() {
    this.props.fetchCustomers();
    this.props.fetchWorkers();
    this.props.fetchOrders();
    this.props.fetchOrderItems();
    this.props.fetchSellingItems();
    this.props.fetchSellings();
    this.props.fetchRates();
  }
  render() {
    return (
      <Div>
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
        <Route
          exact
          path="/(.+)"
          render={() => (
            <Div>
              <Grid gutterWidth="4rem" style={{ margin: "3rem" }}>
                <Grid.Row columns={4}>
                  <Grid.Column>
                    <SideBar />
                  </Grid.Column>
                  <Grid.Column span={3} style={{ padding: "0 4rem" }}>
                    <span
                      style={{ fontSize: "3.5rem", cursor: "pointer" }}
                      onClick={this.handelBack}
                    >
                      &#8592;
                    </span>
                    <Switch>
                      <Route path="/customers" component={Customers} />
                      <Route
                        path="/customer/register"
                        component={RegisterCustomer}
                      />

                      <Route path="/customer/:id" component={Customer} />

                      <Route path="/workers" component={Workers} />

                      <Route
                        path="/worker/register"
                        component={RegisterWorker}
                      />

                      <Route path="/worker/:id" component={Worker} />

                      <Route path="/orders" component={Orders} />
                      <Route path="/order/:id" component={Order} />
                      <Route path="/order" component={Order} />

                      <Route path="/selling" component={Selling} />
                      <Route path="/sellings" component={Sellings} />

                      <Route path="/settings/rate" component={RateSettings} />
                      <Route path="/settings/app" component={AppSettings} />
                      <Route path="/workshop" component={WorkShop} />
                    </Switch>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Div>
          )}
        />
      </Div>
    );
  }
}

const actions = {
  fetchCustomers,
  fetchWorkers,
  fetchOrders,
  fetchOrderItems,
  fetchSellingItems,
  fetchSellings,
  fetchRates
};

export default withRouter(
  connect(
    () => ({}),
    actions
  )(App)
);
