import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaEye,
  FaPlus,
  FaWrench,
  FaMoneyCheckAlt,
  FaDollarSign,
  FaClock,
  FaCogs,
  FaAppStoreIos,
  FaGreaterThanEqual,
  FaTruck
} from "react-icons/fa";

import Sidebar from "../../app/components/SideBar/SideBar";
import Collapse from "../../app/components/Collapse/Collapse";
import { H3 } from "../../app/components/Heading/Heading";

import "./SideBar.css";

class SideBar extends Component {
  render() {
    const { sidebar, h3, collapseContent } = styles;
    return (
      <Sidebar style={sidebar}>
        <Sidebar.Header>
          <H3 style={h3}>Admin</H3>
        </Sidebar.Header>
        <Sidebar.Content>
          <Collapse>
            <Collapse.Trigger>
              <div className="TriggerItem">
                <FaDollarSign /> &nbsp;&nbsp; Sell Item
              </div>
            </Collapse.Trigger>
            <Collapse.Content style={collapseContent}>
              <NavLink to="/selling">
                <div className="subItem">
                  <FaMoneyCheckAlt /> &nbsp;&nbsp; Sell
                </div>
              </NavLink>
              <NavLink to="/sellings">
                <div className="subItem">
                  <FaClock /> &nbsp;&nbsp;{" "}
                  <span style={{ fontSize: "1.8rem" }}>Selling History</span>
                </div>
              </NavLink>
            </Collapse.Content>
          </Collapse>
          <Collapse>
            <Collapse.Trigger>
              <div className="TriggerItem">
                <FaTruck /> &nbsp;&nbsp; Order
              </div>
            </Collapse.Trigger>
            <Collapse.Content style={collapseContent}>
              <NavLink to="/order">
                <div className="subItem">
                  <FaPlus /> &nbsp;&nbsp; Place Order
                </div>
              </NavLink>

              <NavLink to="/orders">
                <div className="subItem">
                  &nbsp;
                  <FaEye /> &nbsp;&nbsp; Orders
                </div>
              </NavLink>
            </Collapse.Content>
          </Collapse>
          <Collapse>
            <Collapse.Trigger>
              <div className="TriggerItem">
                <FaUser /> &nbsp;&nbsp; Customers
              </div>
            </Collapse.Trigger>
            <Collapse.Content style={collapseContent}>
              <NavLink to="/customers">
                <div className="subItem">
                  <FaEye /> &nbsp;&nbsp; View
                </div>
              </NavLink>

              <NavLink to="/customer/register">
                <div className="subItem">
                  &nbsp;
                  <FaPlus /> &nbsp;&nbsp; Register
                </div>
              </NavLink>
            </Collapse.Content>
          </Collapse>
          <Collapse>
            <Collapse.Trigger>
              <div className="TriggerItem">
                <FaWrench /> &nbsp;&nbsp; Workers
              </div>
            </Collapse.Trigger>
            <Collapse.Content style={collapseContent}>
              <NavLink to="/workers">
                <div className="subItem">
                  <FaEye /> &nbsp;&nbsp; View
                </div>
              </NavLink>

              <NavLink to="/worker/register">
                <div className="subItem">
                  &nbsp;
                  <FaPlus /> &nbsp;&nbsp; Register
                </div>
              </NavLink>
            </Collapse.Content>
          </Collapse>
          <Collapse>
            <Collapse.Trigger>
              <div className="TriggerItem">
                <FaCogs /> &nbsp;&nbsp; Settings
              </div>
            </Collapse.Trigger>
            <Collapse.Content style={collapseContent}>
              <NavLink to="/settings/rate">
                <div className="subItem">
                  <FaGreaterThanEqual /> &nbsp;&nbsp; Rate Settings
                </div>
              </NavLink>

              <NavLink to="/settings/app">
                <div className="subItem">
                  &nbsp;
                  <FaAppStoreIos /> &nbsp;&nbsp; App Settings
                </div>
              </NavLink>
            </Collapse.Content>
          </Collapse>
        </Sidebar.Content>
      </Sidebar>
    );
  }
}

const styles = {
  sidebar: {
    borderRadius: "4px"
  },
  h3: {
    width: "190px",
    borderBottom: "1px solid #fff",
    marginBottom: "2rem"
  },
  collapseContent: {
    marginLeft: "2rem"
  }
};

export default SideBar;
