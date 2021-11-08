import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";
import moment from "moment";

test("should set up default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should set up add expense", () => {
  const expense = {
    id: "newId",
    description: "description",
    note: "note",
    amount: 100,
    createdAt: 5000,
  };
  const state = expensesReducer(expenses, { type: "ADD_EXPENSE", expense });
  expect(state).toEqual([...expenses, expense]);
});

test("should set up remove expense with valid id", () => {
  const state = expensesReducer(expenses, {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id,
  });
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should set up remove expense with invalid id", () => {
  const state = expensesReducer(expenses, {
    type: "REMOVE_EXPENSE",
    id: "invalidId",
  });
  expect(state).toEqual(expenses);
});

test("should set up edit expense with valid id", () => {
  const updates = {
    description: "the new description",
    note: "a new note",
    amount: 654321,
    createdAt: moment(),
  };
  const state = expensesReducer(expenses, {
    type: "EDIT_EXPENSE",
    id: expenses[2].id,
    updates,
  });
  expect(state).toEqual([
    expenses[0],
    expenses[1],
    {
      id: expenses[2].id,
      ...updates,
    },
  ]);
});

test("should set up edit expense with invalid id", () => {
  const updates = {
    description: "the new description",
    note: "a new note",
    amount: 654321,
    createdAt: moment(),
  };
  const state = expensesReducer(expenses, {
    type: "EDIT_EXPENSE",
    id: "invalidId",
    updates,
  });
  expect(state).toEqual(expenses);
});

test("should set up set expenses", () => {
  const state = expensesReducer(expenses, {
    type: "SET_EXPENSES",
    expenses: [expenses[2], expenses[1]],
  });
  expect(state).toEqual([expenses[2], expenses[1]]);
});
