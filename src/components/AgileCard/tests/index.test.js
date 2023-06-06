import React from 'react';
import { act, createEvent, fireEvent, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileCard, { AgileCardDiv } from '../index';
import { wrapWithTestBackend } from 'react-dnd-test-utils';
import { pickCard, selectCard, softSelectCard } from '../../../features/card/cardSlice';

const mockSelector = jest.fn();
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => mockSelector(),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../../features/card/cardSlice');

jest.mock('../../AgileCardField', () => () =>
  (<div data-testid="agile-card-field"/>));
jest.mock('../../AgileCardAssignee', () => () =>
  (<div data-testid="agile-card-assignee"/>));
jest.mock('../../AgileCardSubtask', () => () =>
  (<div data-testid="agile-card-subtask"/>));

describe('AgileCard', () => {
  let container = null;
  let root = null;
  let [AgileCardContext, getBackend] = [];

  beforeEach(() => {
    [AgileCardContext, getBackend] = wrapWithTestBackend(AgileCard);
    container = document.createElement("div");
    root = ReactDOMClient.createRoot(container);
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    container = null;
  });

  it('should render AgileCard with props', () => {
    const issueData = {
      id: 'issue-id',
      fields: [],
      summary: 'issue-summary',
      idReadable: 'issue-id-readable',
      subtasks: [],
      resolved: false
    }
    act(() => {
      root.render(<AgileCardContext issueData={issueData}/>);
    });

    expect(screen.getByTestId('agile-card')).toBeInTheDocument();
  });

  it('should pick card when click with pressed ctrl', () => {
    const issueData = {
      id: 'issue-id',
      fields: [],
      summary: 'issue-summary',
      idReadable: 'issue-id-readable',
      subtasks: [],
      resolved: false
    }
    act(() => {
      root.render(<AgileCardContext issueData={issueData}/>);
    });

    const agileCard = screen.getByTestId('agile-card');
    const clickCtrlEvent = createEvent.click(agileCard, {ctrlKey: true});
    fireEvent(agileCard, clickCtrlEvent);
    expect(mockDispatch).toHaveBeenCalledWith(pickCard({cardId: issueData.id}));
  });

  it('should soft select card when click with pressed shift', () => {
    const issueData = {
      id: 'issue-id',
      fields: [],
      summary: 'issue-summary',
      idReadable: 'issue-id-readable',
      subtasks: [],
      resolved: false
    }
    act(() => {
      root.render(<AgileCardContext issueData={issueData}/>);
    });

    const agileCard = screen.getByTestId('agile-card');
    const clickShiftEvent = createEvent.click(agileCard, {shiftKey: true});
    fireEvent(agileCard, clickShiftEvent);
    expect(mockDispatch).toHaveBeenCalledWith(softSelectCard({cardId: issueData.id}));
  });

  it('should select card when click', () => {
    const issueData = {
      id: 'issue-id',
      fields: [],
      summary: 'issue-summary',
      idReadable: 'issue-id-readable',
      subtasks: [],
      resolved: false
    }
    act(() => {
      root.render(<AgileCardContext issueData={issueData}/>);
    });

    const agileCard = screen.getByTestId('agile-card');
    const clickEvent = createEvent.click(agileCard);
    fireEvent(agileCard, clickEvent);
    expect(mockDispatch).toHaveBeenCalledWith(selectCard({cardId: issueData.id}));
  });

  // it('should render AgileCard with less opacity while dragging', () => {
  //   const issueData = {
  //     id: 'issue-id',
  //     fields: [],
  //     summary: 'issue-summary',
  //     idReadable: 'issue-id-readable',
  //     subtasks: [],
  //     resolved: false
  //   }
  //   act(() => {
  //     root.render(<AgileCardContext issueData={issueData}/>);
  //   });
  //
  //   act(() => {
  //     getBackend().simulateBeginDrag([handlerId]);
  //   })
  //   expect(screen.getByTestId('agile-card')).toHaveStyle('opacity: 0.5');
  // });
  //
  // it('should render AgileCard with normal opacity while not dragging', () => {
  //   mockUseDrag.mockReturnValueOnce([{isDragging: false}, () => {}])
  //   const issueData = {
  //     id: 'issue-id',
  //     fields: [],
  //     summary: 'issue-summary',
  //     idReadable: 'issue-id-readable',
  //     subtasks: [],
  //     resolved: false
  //   }
  //   act(() => {
  //     root.render(<AgileCardContext issueData={issueData}/>);
  //   });
  //
  //   expect(screen.getByTestId('agile-card')).toHaveStyle('opacity: 1');
  // });

  it('should render selected AgileCard', () => {
    mockSelector.mockReturnValueOnce({id: 'issue-id'});
    const issueData = {
      id: 'issue-id',
      fields: [],
      summary: 'issue-summary',
      idReadable: 'issue-id-readable',
      subtasks: [],
      resolved: false
    }
    act(() => {
      root.render(<AgileCardContext issueData={issueData}/>);
    });

    expect(screen.getByTestId('agile-card')).toHaveProperty('selected', true);
  });
});
