import React from 'react';
import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileBoardFooter from '../AgileBoardFooter';
import { useSelector } from 'react-redux';
import { resetPicked, resetSelection } from '../../../features/card/cardSlice';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}));

jest.mock('@jetbrains/ring-ui/dist/button-group/button-group', () => ({children, ...props}) =>
  (<div {...props}>{children}</div>));
jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children, ...props}) =>
  (<button {...props}>{children}</button>));
jest.mock('@jetbrains/ring-ui/dist/footer/footer', () => ({left, right}) => {
  return (<div key="footer" data-testid="footer">
    <div key="left" data-testid="left">{left[0].map(x => x?.target ? (<a data-testid="profile-link" key={x.label} target={x.target} href={x.url}>{x.label}</a>) : x)}</div>
    <div key="right" data-testid="right">{right[0]}</div>
  </div>);
});

describe('AgileBoardFooter', () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    container = document.createElement("div");
    root = ReactDOMClient.createRoot(container);
    document.body.appendChild(container);
  });

  afterEach(() => {
    mockDispatch.mockClear()
    container.remove();
    container = null;
  });

  it('should render AgileBoardFooter with props', () => {
    const owner = {
      fullName: 'root root',
      login: 'root',
    }
    act(() => {
      root.render(<AgileBoardFooter owner={owner}/>);
    });

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should render AgileBoardFooter with board owner', () => {
    useSelector
      .mockReturnValueOnce([])
      .mockReturnValueOnce(undefined);

    const owner = {
      fullName: 'root root',
      login: 'root',
    }
    act(() => {
      root.render(<AgileBoardFooter owner={owner}/>);
    });

    expect(screen.getByTestId('right').children.length).toBe(0);

    const leftContent = screen.getByTestId('left');
    expect(leftContent.textContent).toContain('Board owner: root root');
    expect(within(leftContent).getByTestId('profile-link').href).toContain('/root');
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should render AgileBoardFooter with selected card', () => {
    const selectedId = {id: 'test-1'};
    useSelector
      .mockReturnValueOnce([selectedId])
      .mockReturnValueOnce(selectedId);

    const owner = {
      fullName: 'root root',
      login: 'root',
    }
    act(() => {
      root.render(<AgileBoardFooter owner={owner}/>);
    });
    const rightContent = screen.getByTestId('right-button-group');
    expect(rightContent).toBeInTheDocument();
    expect(rightContent.children.length).toBe(2);

    expect(screen.getByTestId('left').textContent).toBe('1 card selected');

    const leftButtonGroup = screen.getByTestId('left-button-group');
    expect(leftButtonGroup).toBeInTheDocument();
    expect(leftButtonGroup.children.length).toBe(3)

    expect(screen.getByTestId('reset-selection')).toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should reset selected card', () => {
    const selectedId = {id: 'test-1'};
    useSelector
      .mockReturnValueOnce([])
      .mockReturnValueOnce(selectedId);

    const owner = {
      fullName: 'root root',
      login: 'root',
    }
    act(() => {
      root.render(<AgileBoardFooter owner={owner}/>);
    });
    fireEvent(
      screen.getByTestId('reset-selection'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(resetSelection());
  });

  it('should reset picked card', () => {
    const selectedId = {id: 'test-1'};
    useSelector
      .mockReturnValueOnce([selectedId, {id: 'test-2'}])
      .mockReturnValueOnce(selectedId);

    const owner = {
      fullName: 'root root',
      login: 'root',
    }
    act(() => {
      root.render(<AgileBoardFooter owner={owner}/>);
    });

    fireEvent(
      screen.getByTestId('reset-selection'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(resetPicked());
  });
});
