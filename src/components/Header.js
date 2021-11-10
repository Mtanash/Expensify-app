import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startSignout } from "../actions/auth";

export const Header = ({ startSignout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__contnet">
        <Link className="header__title" to="/dashboard">
          <h1>Expensify</h1>
        </Link>
        <button className="button button--transparent" onClick={startSignout}>
          Logout
        </button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startSignout: () => dispatch(startSignout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
