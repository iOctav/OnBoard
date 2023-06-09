import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import OAuth from '../OAuth';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}));

jest.mock('react-router-dom', () => ({
  Navigate: ({to}) => (<div data-testid="navigate">{to}</div>)
}));

describe('OAuth', () => {
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

  it('should render OAuth', async () => {
    act(() => {
      root.render(<OAuth/>);
    });

    await waitFor(() => expect(screen.getByTestId('navigate')).toBeInTheDocument());
  });

  it('should render navigate to error if hashparam is not presented', async () => {
    act(() => {
      root.render(<OAuth/>);
    });

    await waitFor(() => expect(screen.getByTestId('navigate').textContent).toBe('/error'));
  });
});