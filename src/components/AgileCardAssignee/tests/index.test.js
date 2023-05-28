import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileCardAssignee from '../index';

jest.mock('@jetbrains/ring-ui/dist/avatar/avatar', () => ({
  __esModule: true,
  Size: {
    Size14: 'Size14',
  },
  default: ({ children }) =>
    (<div data-testid="avatar"/>),
}));

jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<button data-testid="button">{children}</button>));

jest.mock('../../LazySelectBox', () => ({customAnchor}) =>
  (<div data-testid="lazy-select-box">
    {customAnchor({}, {}, {})}
  </div>));

describe('AgileCardAssignee', () => {
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

  it('should render AgileCardAssignee with props', () => {
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
      projectCustomField: {
        bundle: {
          id: 'bundle-id',
        }
      }
    }
    act(() => {
      root.render(<AgileCardAssignee field={field}/>);
    });

    expect(screen.getByTestId('agile-card-assignee')).toBeInTheDocument();
  });

  it('should render AgileCardAssignee with avatar', () => {
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
      projectCustomField: {
        bundle: {
          id: 'bundle-id',
        }
      }
    }
    act(() => {
      root.render(<AgileCardAssignee field={field}/>);
    });

    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
  });

  it('should render AgileCardAssignee with button for unassigned', () => {
    const field = {
      value: undefined,
      projectCustomField: {
        bundle: {
          id: 'bundle-id',
        }
      }
    }
    act(() => {
      root.render(<AgileCardAssignee field={field}/>);
    });

    expect(screen.queryByTestId('avatar')).not.toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });
});
