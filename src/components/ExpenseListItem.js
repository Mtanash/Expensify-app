import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

export const ExpenseListItem = ({ description, amount, createdAt, id }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h2>{description}</h2>
    </Link>
    <p>
      {numeral(amount).format("$0,0.00")}-
      {moment(createdAt).format("MMMM DO, YYYY")}
    </p>
  </div>
);

export default connect()(ExpenseListItem);
