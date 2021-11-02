import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      expense={expenses[0]}
      editExpense={editExpense}
      removeExpense={removeExpense}
      history={history}
    />
  );
});

test("should render EditeExpensePage correctly", () => {
  const wrapper = shallow(<EditExpensePage expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should handle edit expense", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
  expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith("/");
});

test("should handle remove expense", () => {
  wrapper.find("button").simulate("click");
  expect(removeExpense).toHaveBeenLastCalledWith(expenses[0].id);
  expect(history.push).toHaveBeenLastCalledWith("/");
});
