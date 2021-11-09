import React from "react";
import { Header } from "../../components/Header";
import { shallow } from "enzyme";

let wrapper, startSignout;
beforeEach(() => {
  startSignout = jest.fn();
  wrapper = shallow(<Header startSignout={startSignout} />);
});

test("should render Header correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should call startLogout on button click", () => {
  wrapper.find("button").simulate("click");
  expect(startSignout).toHaveBeenCalled();
});
