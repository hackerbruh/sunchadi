import React from "react";
import cuid from "cuid";

// import "./Grid.css";

const Grid = ({ children, columns, style, gutterWidth = "6rem" }) => {
  const gridId = cuid();
  if (columns)
    throw new Error("You must specify number of columns in grid!");
  return (
    <div className={`grid${gridId}`} style={style}>
      <style>
        {`.grid${gridId} .row {
            max-width: 100%;
          }
          .grid${gridId} .row:not(:last-child) {
            margin-bottom: 8rem;
          }
          .grid${gridId} .row::after {
            content: "";
            display: table;
            clear: both;
          }
          .grid${gridId} .row [class^="col-"] {
            float: left;
          }

          .grid${gridId} .row [class^="col-"]:not(:last-child) {
            margin-right: ${gutterWidth};
          }

          .grid${gridId} .row .col-1-of-2 {
            width: calc((100% - ${gutterWidth}) / 2);
          }

          .grid${gridId} .row .col-1-of-3 {
            width: calc((100% - 2 * ${gutterWidth}) / 3);
          }

          .grid${gridId} .row .col-2-of-3 {
            width: calc(2 * ((100% - 2 * ${gutterWidth}) / 3) + ${gutterWidth});
          }

          .grid${gridId} .row .col-1-of-4 {
            width: calc((100% - 3 * ${gutterWidth}) / 4);
          }

          .grid${gridId} .row .col-2-of-4 {
            width: calc(2 * ((100% - 3 * ${gutterWidth}) / 4));
          }

          .grid${gridId} .row .col-3-of-4 {
            width: calc(
              3 * ((100% - 3 * ${gutterWidth}) / 4) + 2 * ${gutterWidth}
            );
          }
        `}
      </style>
      {children}
    </div>
  );
};
Grid.Row = props => {
  const children = React.Children.map(props.children, child => {
    return React.cloneElement(child, {
      columns: props.columns
    });
  });
  return (
    <div className="row" style={props.style}>
      {children}
    </div>
  );
};

Grid.Column = ({ children, span, columns, style = {} }) => (
  <div className={`col-${span || 1}-of-${columns}`} style={style}>
    {children}
  </div>
);

export default Grid;
