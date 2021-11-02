import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";
import React from "react";
import { shallow } from "enzyme";

test("should render ExpenseDashboardPage correctly", () => {
  const wrapper = shallow(<ExpenseDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
