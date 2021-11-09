import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { startSignout } from "../actions/auth";

export const Header = ({ startSignout }) => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/dashboard" activeClassName="is-active" exact={true}>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
    <button onClick={startSignout}>Logout</button>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startSignout: () => dispatch(startSignout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
