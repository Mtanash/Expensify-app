import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  removeExpense,
  editExpense,
  startAddExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import { database } from "../../firebase/firebase";
import { get, ref, set } from "@firebase/database";

const createMockStore = configMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expensesData[id] = { description, amount, note, createdAt };
  });
  set(ref(database, "expenses"), expensesData).then(() => done());
});

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

test("should setup set expenses action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses,
  });
});

test("should fetch the expenses from firebase", (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses,
    });
    done();
  });
});

test("should remove expense from firebase", (done) => {
  const store = createMockStore({});
  store.dispatch(startRemoveExpense(expenses[1].id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "REMOVE_EXPENSE",
      id: expenses[1].id,
    });
  });
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[1].expenses).toEqual([expenses[0], expenses[2]]);

    done();
  });
});

test("should edit expense from firebase", (done) => {
  const updates = {
    description: "the edited description",
    note: "edited",
    amount: 10500,
  };
  const store = createMockStore({});
  store.dispatch(startEditExpense(expenses[1].id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "EDIT_EXPENSE",
      id: expenses[1].id,
      updates,
    });
  });
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[1].expenses[1].description).toEqual(updates.description);
    expect(actions[1].expenses[1].note).toEqual(updates.note);
    expect(actions[1].expenses[1].amount).toEqual(updates.amount);

    done();
  });
});
