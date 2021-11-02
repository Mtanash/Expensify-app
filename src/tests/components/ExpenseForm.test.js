import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

test("should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm with expense data", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", { preventDefault: () => {} });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
  const value = "new description";
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("input").at(0).simulate("change", { target: { value } });
  expect(wrapper.state("description")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test("should set note on textarea change", () => {
  const value = "new note";
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("textarea").simulate("change", { target: { value } });
  expect(wrapper.state("note")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test("should set amount with valid value", () => {
  const value = "15.99";
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("input").at(1).simulate("change", { target: { value } });
  expect(wrapper.state("amount")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test("should set amount with invalid value", () => {
  const value = "15.9965";
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("input").at(1).simulate("change", { target: { value } });
  expect(wrapper.state("amount")).toBe("");
  expect(wrapper).toMatchSnapshot();
});

test("should call onSubmit prop with valid form submission", () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", { preventDefault: () => {} });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt,
  });
});

test("should set new date on date change", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toBe(now);
});

// test("should set calendarFocused on focus change", () => {
//   const focus = true;
//   const wrapper = shallow(<ExpenseForm />);
//   wrapper.find(SingleDatePicker).prop("onFocusChange")({ focus });
//   console.log(wrapper.state());
//   expect(wrapper.state("calendarFocused")).toBe(focus);
// });
