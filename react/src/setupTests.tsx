import "@testing-library/jest-dom/extend-expect";

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
