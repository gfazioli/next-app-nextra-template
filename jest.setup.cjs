// Every one of these patches is a jsdom patch, and this file runs for EVERY
// suite - including the ones that ask for the `node` environment because they
// exercise a route handler and need a real `Response`. Without the guard those
// suites die on `window is not defined` before their first line runs, which
// reads as a broken test rather than as a setup file in the wrong place.
if (typeof window === 'undefined') {
  module.exports = {};
} else {
  require('@testing-library/jest-dom');

  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);
  window.HTMLElement.prototype.scrollIntoView = () => {};

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver;
}
