import React from 'react';
import { act, screen  } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import Swimlane from '../index';
import { COLORS } from '../../ColorPalette/colors';


jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children, onClick, active, ...props}) =>
  (<button data-testid="button" onClick={onClick} className={active ? 'active' : ''} {...props}>{children}</button>));
jest.mock('@jetbrains/ring-ui/dist/icon/icon', () => ({glyph}) =>
  (<span data-testid="icon"/>));
jest.mock('@jetbrains/ring-ui/dist/link/link', () => ({href, target, children}) =>
  (<a data-testid="link" href={href} target={target}>{children}</a>));

describe('Swimlane', () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    container = document.createElement("tbody");
    root = ReactDOMClient.createRoot(container);
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    container = null;
  });

  it('should render Swimlane with correct props', () => {

    act(() => {
      root.render(<Swimlane columnsNumber={0} swimlanesDepth={0} level={0} />);
    });

    expect(screen.getByTestId('swimlane-tr')).toBeInTheDocument();
  });

  it('should render Swimlane without title', () => {
    const mockProps = {
      title: undefined,
    };

    act(() => {
      root.render(<Swimlane columnsNumber={4} swimlanesDepth={0} level={0} {...mockProps}/>);
    });
    const td = screen.getByTestId('swimlane-td');
    expect(td.colSpan).toBe(4);
    expect(td.childElementCount).toBe(0);
  })

  it('should render system level Swimlane with title', () => {
    const mockProps = {
      title: 'Vital cards',
      level: -1
    };

    act(() => {
      root.render(<Swimlane columnsNumber={4} swimlanesDepth={0} {...mockProps}/>);
    });

    const td = screen.getByTestId('swimlane-td')
    expect(td.colSpan).toBe(4);
    expect(td.childElementCount).toBe(1);

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe(mockProps.title);
    expect(button).not.toHaveStyle('text-decoration: line-through');

    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
  })

  it('should render system level orphan Swimlane with title', () => {
    const mockProps = {
      title: 'Uncategorized Cards',
      isOrphan: true,
      level: -1
    };

    act(() => {
      root.render(<Swimlane columnsNumber={4} swimlanesDepth={0} {...mockProps}/>);
    });

    const td = screen.getByTestId('swimlane-td')
    expect(td.colSpan).toBe(4);
    expect(td.childElementCount).toBe(1);

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe(mockProps.title);
    expect(button).not.toHaveStyle('text-decoration: line-through');


    expect(screen.queryByTestId('icon')).toBeNull();
  })

  it('should render swimlane with several card under it', () => {
    const mockProps = {
      title: 'Vital cards',
      level: -1,
      cardsNumber: 26
    };

    act(() => {
      root.render(<Swimlane columnsNumber={4} swimlanesDepth={0} {...mockProps}/>);
    });

    const cardsSpan = screen.queryByText('1 card');
    expect(cardsSpan).toBeInTheDocument();
  })

  it('should not render card counter when number is negative', () => {
    const mockProps = {
      title: 'Vital cards',
      level: -1,
      cardsNumber: -26
    };

    act(() => {
      root.render(<Swimlane columnsNumber={4} swimlanesDepth={0} {...mockProps}/>);
    });

    const cardsSpan = screen.queryByText('1 card');
    expect(cardsSpan).toBeNull();
  })

  it('should render level marker when level is greater or equal than 0', () => {
    const mockProps = {
      title: 'Vital cards',
      level: 2,
      cardsNumber: 26
    };

    act(() => {
      root.render(<Swimlane columnsNumber={4} swimlanesDepth={0} {...mockProps}/>);
    });

    const levelMarker = screen.queryByText(`L${mockProps.level}`);
    expect(levelMarker).toBeInTheDocument();
  })

  it('should render colored level marker when bgId is provided', () => {
    const bgId = 23;
    const mockProps = {
      title: 'Vital cards',
      level: 2,
      cardsNumber: 26,
      backgroundId: `${bgId}`,
    };

    act(() => {
      root.render(<Swimlane columnsNumber={4} swimlanesDepth={0} {...mockProps}/>);
    });

    const levelMarker = screen.queryByText(`L${mockProps.level}`);
    expect(levelMarker).toBeInTheDocument();
    expect(levelMarker.classList.contains(`ring-palette_tone-${COLORS[bgId].tone}-${COLORS[bgId].brightness}`)).toBeTruthy();
  })

  it('should decorate title with line-through when striked is set', () => {
    const mockProps = {
      title: 'Vital cards',
      level: -1,
      striked: true,
    };

    act(() => {
      root.render(<Swimlane columnsNumber={4} swimlanesDepth={0} {...mockProps}/>);
    });

    const td = screen.getByTestId('swimlane-td')
    expect(td.colSpan).toBe(4);
    expect(td.childElementCount).toBe(1);

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe(mockProps.title);
    expect(button).toHaveStyle('text-decoration: line-through');
  })
});