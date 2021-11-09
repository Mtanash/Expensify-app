import { get, push, ref, remove, set, update } from "@firebase/database";
import { database } from "../firebase/firebase";

const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense,
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;
    const expense = { description, note, amount, createdAt };

    const expensesRef = ref(database, `users/${uid}/expenses`);
    const newExpensePush = push(expensesRef);
    return set(newExpensePush, expense).then(() => {
      dispatch(
        addExpense({
          id: newExpensePush.key,
          ...expense,
        })
      );
    });
  };
};

const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

const startRemoveExpense = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return remove(ref(database, `users/${uid}/expenses/${id}`)).then(() => {
      dispatch(removeExpense({ id }));
    });
  };
};

const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return update(ref(database, `users/${uid}/expenses/${id}`), updates).then(
      () => {
        dispatch(editExpense(id, updates));
      }
    );
  };
};

const setExpenses = (expenses) => ({
  type: "SET_EXPENSES",
  expenses,
});

const startSetExpenses = (expenses) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return get(ref(database, `users/${uid}/expenses`)).then((snapshot) => {
      const expenses = [];
      if (snapshot.exists()) {
        snapshot.forEach((snap) => {
          expenses.push({ id: snap.key, ...snap.val() });
        });
      }
      dispatch(setExpenses(expenses));
    });
  };
};

export {
  addExpense,
  removeExpense,
  editExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense,
};
