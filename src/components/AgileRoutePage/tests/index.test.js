import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileRoutePage from '../index';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-dnd-scrolling', () => (component) =>
  ({children}) => (<div data-testid="scrolling-component" >{children}</div>));

jest.mock('../../PageYTHeader', () => () =>
  (<div data-testid="page-yt-header"/>));
jest.mock('../../AgileBoard', () => () =>
  (<div data-testid="agile-board"/>));
jest.mock('../../AgileBoard/DefaultAgileBoard', () => () =>
  (<div data-testid="default-agile-board"/>));
jest.mock('../../../features/auth/AuthOutlet', () => () =>
  (<div data-testid="auth-outlet"/>));
jest.mock('../../RedirectPage', () => () =>
  (<div data-testid="redirect-page"/>));
jest.mock('../../ErrorPage', () => () =>
  (<div data-testid="error-page"/>));

describe('AgileRoutePage', () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    container = document.createElement("div");
    root = ReactDOMClient.createRoot(container);
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    container = null;
  });

  it('should render AgileRoutePage', () => {
    act(() => {
      root.render(<MemoryRouter initialEntries={['/agiles']}>
        <AgileRoutePage/>
      </MemoryRouter>);
    });

    expect(screen.getByTestId('scrolling-component')).toBeInTheDocument();
  });
});