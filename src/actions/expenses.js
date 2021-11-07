import { push, ref, set } from "@firebase/database";
import { database } from "../firebase/firebase";

const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense,
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;
    const expense = { description, note, amount, createdAt };

    const expensesRef = ref(database, "expenses");
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

const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

export { addExpense, removeExpense, editExpense };
