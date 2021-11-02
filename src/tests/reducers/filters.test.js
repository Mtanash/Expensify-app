import moment from "moment";

import filtersReducer from "../../reducers/filters";

test("should setup default filters value", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
});

test("should set sortBy to amount", () => {
  const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" });
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  const defaultState = {
    text: "",
    sortBy: "amount",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  };
  const state = filtersReducer(defaultState, { type: "SORT_BY_DATE" });
  expect(state.sortBy).toBe("date");
});

test("should set text to value", () => {
  const text = "new text";
  const state = filtersReducer(undefined, { type: "SET_TEXT_FILTER", text });
  expect(state.text).toBe(text);
});

test("should set startDate to value", () => {
  const startDate = moment();
  const state = filtersReducer(undefined, {
    type: "SET_START_DATE",
    startDate,
  });
  expect(state.startDate).toBe(startDate);
});

test("should set endDate to value", () => {
  const endDate = moment();
  const state = filtersReducer(undefined, {
    type: "SET_END_DATE",
    endDate,
  });
  expect(state.endDate).toBe(endDate);
});
