import React from "react";
import { withRouter } from "react-router-dom";

import "./SellingItem.css";

import Collapse from "../../../../app/components/Collapse/Collapse";
import { H3 } from "../../../../app/components/Heading/Heading";
import Grid from '../../../../app/components/Grid/Grid'

export default withRouter(({ selling }) => {
  const { cust_name, soldDate, total, items } = selling;
  return (
    <div>
      <Collapse>
        <Collapse.Trigger>
          <div className="selling__item" style={{ background: "#441678" }}>
            <Grid gutterWidth="2rem" style={{ marginLeft: '6rem' }}>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <h3>{cust_name}</h3>
                </Grid.Column>
                <Grid.Column>
                  <h3>{soldDate}</h3>
                </Grid.Column>
                <Grid.Column>
                  <h3>{total}</h3>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Collapse.Trigger>
        <Collapse.Content>
          <div className="order__info">
            {items.map((item, index) => (
              <div key={index}>
                <H3 center>Item {index + 1}</H3>
                <table key={item.id} className="order__info--table">
                  <tbody>
                    <tr>
                      <td>Item Name</td>
                      <th>{item.name}</th>
                    </tr>
                    <tr>
                      <td>Item Code</td>
                      <th>{item.code}</th>
                    </tr>
                    <tr>
                      <td>Item Weight</td>
                      <th>{item.finalWt}</th>
                    </tr>
                    <tr>
                      <td>Item Loss</td>
                      <th>{item.loss}</th>
                    </tr>

                    <tr>
                      <td>Item Wage</td>
                      <th>{item.wages}</th>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <th>{item.price}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </Collapse.Content>
      </Collapse>
    </div>
  );
});
