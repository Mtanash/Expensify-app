import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const ExpenseListItem = ({ description, amount, createdAt, id }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h2>{description}</h2>
    </Link>
    <p>Amount: {amount}</p>
    <p>Created At: {createdAt}</p>
  </div>
);

export default connect()(ExpenseListItem);
