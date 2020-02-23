import "@testing-library/jest-dom/extend-expect";
import ReactTestUtils, { act } from "react-dom/test-utils";

// Fixes problem - https://stackoverflow.com/questions/48809753/testing-mutationobserver-with-jest
// @ts-ignore
global.MutationObserver = class {
  // @ts-ignore
  constructor(callback) {}
  // @ts-ignore
  disconnect() {}
  // @ts-ignore
  observe(element, initObject) {}
};

export const changeValue = (widget: any, value: any) => {
  widget.value = value;
  ReactTestUtils.Simulate.change(widget);
};

export const mouseClick = (widget: any) =>
  act(() => {
    widget.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
