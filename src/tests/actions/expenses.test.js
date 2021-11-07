import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  removeExpense,
  editExpense,
  startAddExpense,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import { database } from "../../firebase/firebase";
import { get, ref } from "@firebase/database";

const createMockStore = configMockStore([thunk]);

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc",
  });
});

test("should setup edit expense action object", () => {
  const action = editExpense("123abc", {
    description: "new description",
    amount: 100,
    note: "new note",
    createdAt: 12345,
  });

  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      description: "new description",
      amount: 100,
      note: "new note",
      createdAt: 12345,
    },
  });
});

test("should setup add expense action object with provided values", () => {
  const expense = expenses[1];

  const action = addExpense(expense);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense,
  });
});

// test("should setup add expense action object with default values", () => {
//   const action = addExpense();

//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       id: expect.any(String),
//       description: "",
//       note: "",
//       amount: 0,
//       createdAt: 0,
//     },
//   });
// });

test("should add expense to database and store", (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: "rent",
    amount: 1500,
    note: "",
    createdAt: 1000,
  };
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseData,
      },
    });

    get(ref(database, `expenses/${actions[0].expense.id}`)).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
  });
});

test("should add expense with defaults to database and store", (done) => {
  const store = createMockStore({});

  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        description: "",
        note: "",
        amount: 0,
        createdAt: 0,
      },
    });

    get(ref(database, `expenses/${actions[0].expense.id}`)).then((snapshot) => {
      expect(snapshot.val()).toEqual({
        description: "",
        note: "",
        amount: 0,
        createdAt: 0,
      });
      done();
    });
  });
});
