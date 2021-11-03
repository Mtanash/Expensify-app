import { ExpensesSummary } from "../../components/ExpensesSummary";
import React from "react";
import { shallow } from "enzyme";

test("should render ExpensesSummary with one expense", () => {
  const expensesCount = 1;
  const expensesTotal = 94.34;
  const wrapper = shallow(
    <ExpensesSummary
      expensesCount={expensesCount}
      expensesTotal={expensesTotal}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary with two expense", () => {
  const expensesCount = 2;
  const expensesTotal = 94.34;
  const wrapper = shallow(
    <ExpensesSummary
      expensesCount={expensesCount}
      expensesTotal={expensesTotal}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
