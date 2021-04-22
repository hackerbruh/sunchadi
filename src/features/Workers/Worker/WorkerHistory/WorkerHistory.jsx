import React, { Component } from 'react'
import { connect } from 'react-redux'

import Collapse from "../../../../app/components/Collapse/Collapse";

class WorkerHistory extends Component {
  render() {
    return (
      <div style={{ marginBottom: '1rem' }}>
        {this.props.history &&
          this.props.history.map((h, i) => (
            <Collapse key={i}>
              <Collapse.Trigger>
                <div className="list_trigger">
                  Start Date <span className="mark">{h.orderedDate}</span>
                  Complete Date{" "}
                  <span className="mark">{h.submitDate}</span>{" "}
                  <span style={{ fontSize: "1.5rem" }}>&#43;</span>
                </div>
              </Collapse.Trigger>
              <Collapse.Content style={{ fontSize: "2rem" }}>
                <table
                  key={h.id}
                  className="order__info--table"
                  style={{ margin: "0" }}
                >
                  <tbody>
                    <tr>
                      <td>Item Name</td>
                      <th>{h.item}</th>
                    </tr>
                    <tr>
                      <td>Customer Name</td>
                      <th>{h.name}</th>
                    </tr>
                    <tr>
                      <td>Item Rate</td>
                      <th>{h.rate}</th>
                    </tr>
                    <tr>
                      <td>Item Total</td>
                      <th>{h.total}</th>
                    </tr>

                    <tr>
                      <td>Item Wages</td>
                      <th>{h.wages}</th>
                    </tr>
                    <tr>
                      <td>Weight</td>
                      <th>{h.weight}</th>
                    </tr>
                  </tbody>
                </table>
              </Collapse.Content>
            </Collapse>
          ))}
      </div>
    )
  }
}
                  
                
const mapState = (state, props) => {
  const orders = state.orders.orders
  const propHistory = props.history
  let history = []
  if (orders.length > 0) {
    history = propHistory.map(id => orders.find(o => o.id === id))
  }
  return {
    history
  }
}

export default connect(mapState)(WorkerHistory)