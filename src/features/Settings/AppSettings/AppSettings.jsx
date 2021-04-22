import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { FaDollarSign, FaEye, FaPlus, FaTruck } from "react-icons/fa";

import AddOrderItem from "./OrderItems/AddOrderItem/AddOrderItem";
import OrderItems from "./OrderItems/OrderItems/OrderItems";
import AddSellingItem from "./SellingItems/AddSellingItem/AddSellingItem";
import SellingItems from "./SellingItems/SellingItems/SellingItems";

import Collapse from "../../../app/components/Collapse/Collapse";
import Grid from "../../../app/components/Grid/Grid";

class AppSettings extends Component {
  render() {
    return (
      <Grid gutterWidth="3rem">
        <Grid.Row columns={4}>
          <Grid.Column span={3}>
            <Switch>
              <Redirect
                exact
                from="/settings/app"
                to="/settings/app/selling-items"
              />
              <Route  
                path="/settings/app/order-item/:id"
                component={AddOrderItem}
              />
              <Route
                path="/settings/app/order-item/"
                component={AddOrderItem}
              />
              <Route path="/settings/app/order-items" component={OrderItems} />
              <Route
                path="/settings/app/selling-item/:id"
                component={AddSellingItem}
              />
              <Route
                path="/settings/app/selling-item/"
                component={AddSellingItem}
              />
              <Route
                path="/settings/app/selling-items"
                component={SellingItems}
              />
            </Switch>
          </Grid.Column>
          <Grid.Column>
            <ul className="settings__sidebar">
              <li className="settings__siderbar--item">
                <Collapse>
                  <Collapse.Trigger>
                    <FaDollarSign /> &nbsp;&nbsp; Selling Item
                  </Collapse.Trigger>
                  <Collapse.Content>
                    <div className="settings__sidebar--item__subitem">
                      <Link to="/settings/app/selling-item">
                        <FaPlus /> Add Selling Item
                      </Link>
                    </div>
                    <div className="settings__sidebar--item__subitem">
                      <Link to="/settings/app/selling-items">
                        <FaEye /> View Selling Items
                      </Link>
                    </div>
                  </Collapse.Content>
                </Collapse>
              </li>
              <li className="settings__siderbar--item">
                <Collapse>
                  <Collapse.Trigger>
                    <FaTruck /> &nbsp;&nbsp; Order Item
                  </Collapse.Trigger>
                  <Collapse.Content>
                    <div className="settings__sidebar--item__subitem">
                      <Link to="/settings/app/order-item">
                        <FaPlus /> Add Order Item
                      </Link>
                    </div>
                    <div className="settings__sidebar--item__subitem">
                      <Link to="/settings/app/order-items">
                        <FaEye /> View Order Items
                      </Link>
                    </div>
                  </Collapse.Content>
                </Collapse>
              </li>
            </ul>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default AppSettings;
