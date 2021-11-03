export default (expenses) => {
  return expenses
    .map((expense) => expense.amount)
    .reduce((prev, cur) => prev + cur, 0);
};
