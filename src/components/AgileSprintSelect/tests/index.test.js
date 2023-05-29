import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileSprintSelect from '../index';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));
jest.mock('@jetbrains/ring-ui/dist/date-picker/date-picker', () => ({children}) =>
  (<div data-testid="date-picker"/>));

jest.mock('../../../features/sprint/sprintSlice');
jest.mock('../../LazySelectBox', () => ({children}) =>
  (<div data-testid="lazy-select-box">{children}</div>));


describe('AgileSprintSelect', () => {
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

  it('should render AgileSprintSelect with props', () => {
    const sprint = {
      id: 'sprint-id',
      name: 'sprint-name',
      from: '2021-01-01',
      to: '2021-01-02',
    };
    act(() => {
      root.render(<AgileSprintSelect agileId="agile-id" sprint={sprint} />);
    });

    expect(screen.getByTestId('agile-sprint-selector')).toBeInTheDocument();
  });
});