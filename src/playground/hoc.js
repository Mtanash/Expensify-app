import React from "react";
import ReactDOM from "react-dom";

const info = (props) => (
  <div>
    <h1>Info</h1>
    {props.isAuthenticated ? (
      <p>The info is: {props.info}</p>
    ) : (
      <p>Please login</p>
    )}
  </div>
);

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      <WrappedComponent {...props} />
    </div>
  );
};

const AuthInfo = requireAuthentication(info);

ReactDOM.render(
  <AuthInfo isAuthenticated={true} info="This is the info" />,
  document.getElementById("app")
);
