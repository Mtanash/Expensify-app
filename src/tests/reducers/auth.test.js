import authReducer from "../../reducers/auth";

test("should set up login", () => {
  const state = authReducer(
    {},
    {
      type: "LOGIN",
      uid: "12345",
    }
  );
  expect(state).toEqual({ uid: "12345" });
});

test("should set up logout", () => {
  const state = authReducer(
    {},
    {
      type: "LOGOUT",
    }
  );
  expect(state).toEqual({});
});
