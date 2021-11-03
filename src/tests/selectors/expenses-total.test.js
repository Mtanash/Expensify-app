import SelectExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should return 0 if no expenses", () => {
  const result = SelectExpensesTotal([]);
  expect(result).toBe(0);
});

test("should correctly add up a single expense ", () => {
  const result = SelectExpensesTotal([expenses[0]]);
  expect(result).toBe(expenses[0].amount);
});

test("should correctly add up multiple expenses", () => {
  const result = SelectExpensesTotal(expenses);
  expect(result).toBe(114195);
});
