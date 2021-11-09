import { login, startLogin, logout, startSignout } from "../../actions/auth";

test("should set up login action object", () => {
  const action = login("12345");
  expect(action).toEqual({
    type: "LOGIN",
    uid: "12345",
  });
});

test("should set up logout action object", () => {
  const action = logout();
  expect(action).toEqual({
    type: "LOGOUT",
  });
});
