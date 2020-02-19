import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import {JSDOM} from 'jsdom';
import 'react-native';

/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const {window} = jsdom;

function copyProps(src: any, target: any) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}
// @ts-ignore
global.window = window;

// @ts-ignore
global.document = window.document;

// @ts-ignore
global.navigator = {
  userAgent: 'node.js',
};

// @ts-ignore
global.requestAnimationFrame = function(callback) {
  return setTimeout(callback, 0);
};

// @ts-ignore
global.cancelAnimationFrame = function(id) {
  clearTimeout(id);
};

copyProps(window, global);

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
configure({adapter: new Adapter()});

/**
 * Mock components and modules
 */

jest.mock('./net/cart');
jest.mock('./net/category');
jest.mock('./net/categories');
jest.mock('./net/checkout');
