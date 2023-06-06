import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileBoardColGroup from '../AgileBoardColGroup';

const mockSelector = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => mockSelector(),
}));
jest.mock('../../../features/sprint/sprintSlice')

describe('AgileBoardColGroup', () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    container = document.createElement("table");
    root = ReactDOMClient.createRoot(container);
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    container = null;
  });

  it('should render AgileBoardColGroup', () => {
    act(() => {
      root.render(<AgileBoardColGroup/>);
    });

    expect(screen.getByTestId('agile-board-col-group')).toBeInTheDocument();
  });

  it('should render AgileBoardColGroup with fake cols when swimlanes depth > 0', () => {
    act(() => {
      root.render(<AgileBoardColGroup swimlanesDepth={2}/>);
    });

    expect(screen.getByTestId('agile-board-col-group')).toBeInTheDocument();
    expect(screen.getAllByTestId('fake-col').length).toBe(2);
  });

  it('should render AgileBoardColGroup without fake cols when swimlanes depth <= 0', () => {
    act(() => {
      root.render(<AgileBoardColGroup swimlanesDepth={0}/>);
    });

    expect(screen.queryByTestId('fake-col')).not.toBeInTheDocument();
  });

  it('should render AgileBoardColGroup with columns', () => {
    mockSelector
      .mockReturnValue([{id: 'column-1', collapsed: false}, {id: 'column-2', collapsed: false}])
    act(() => {
      root.render(<AgileBoardColGroup swimlanesDepth={0}/>);
    });

    expect(screen.queryAllByTestId('column').length).toBe(2);
    expect(screen.queryByTestId('collapsed-col')).not.toBeInTheDocument();
  });

  it('should render AgileBoardColGroup with collapsed columns', () => {
    mockSelector
      .mockReturnValue([{id: 'column-1', collapsed: true}, {id: 'column-2', collapsed: true}, {id: 'column-3', collapsed: true}])
    act(() => {
      root.render(<AgileBoardColGroup swimlanesDepth={0}/>);
    });

    expect(screen.queryAllByTestId('collapsed-col').length).toBe(3);
    expect(screen.queryByTestId('column')).not.toBeInTheDocument();
  });

  it('should render AgileBoardColGroup with collapsed and expended columns', () => {
    mockSelector
      .mockReturnValue([{id: 'column-1', collapsed: true}, {id: 'column-2', collapsed: false}, {id: 'column-3', collapsed: true}])
    act(() => {
      root.render(<AgileBoardColGroup swimlanesDepth={0}/>);
    });

    expect(screen.queryAllByTestId('collapsed-col').length).toBe(2);
    expect(screen.queryAllByTestId('column').length).toBe(1);
  });
});
