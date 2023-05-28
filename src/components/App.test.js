import React from 'react';
import { act } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import App from './App';

// Mocking @jetbrains/ring-ui components
jest.mock('@jetbrains/ring-ui/dist/style.css', () => ({}));
jest.mock('@jetbrains/ring-ui/dist/global/theme', () => ({
  ThemeProvider: jest.fn(({ children }) =>
    <div data-testid="theme-provider" href="123">{children}</div>),
  Theme: { AUTO: 'auto' },
}));
jest.mock('./AgileRoutePage', () => {
  return function MockedAgileRoutePage() {
    return (
      <div data-testid="agile-route-page">Mocked AgileRoutePage</div>
    );
  };
});

let container = null;
let root = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  root = ReactDOMClient.createRoot(container);
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  // root.unmount();
  container.remove();
  container = null;
});

it("should render App", () => {
  act(() => {
    root.render(<App/>);
  });

  expect(
    container.querySelector("[data-testid='theme-provider']")
  ).toBeDefined();

  // expect(
  //   container.querySelector('[data-testid="site"]').getAttribute("href")
  // ).toEqual("http://test.com");
  //
  // expect(container.querySelector('[data-testid="map"]').textContent).toEqual(
  //   "0:0"
  // );
});