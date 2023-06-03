import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileSprintSelect from '../index';

let mockMakeDataset = null;

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));
jest.mock('@jetbrains/ring-ui/dist/date-picker/date-picker', () => ({children}) =>
  (<div data-testid="date-picker"/>));

jest.mock('../../../features/sprint/sprintSlice');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (val) => [val, jest.fn()]
}))

jest.mock('../../LazySelectBox', () => ({makeDataset, children}) => {
  mockMakeDataset = makeDataset;
  return (<div data-testid="lazy-select-box">{children}</div>);
});


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

  it('should format dates correctly. Two dates and different years', () => {
    const sprint = {
      id: 'sprint-id',
      name: 'sprint-name',
      from: new Date('2020-12-01'),
      to: new Date('2021-01-02'),
    };
    act(() => {
      root.render(<AgileSprintSelect agileId="agile-id" sprint={sprint} />);
    });

    const data = mockMakeDataset([sprint]);

    expect(data[0].description).toBe('1 Dec 2020 — 2 Jan 2021');
  });

  it('should format dates correctly. Two dates and different months', () => {
    const sprint = {
      id: 'sprint-id',
      name: 'sprint-name',
      from: new Date('2021-01-01'),
      to: new Date('2021-12-02'),
    };
    act(() => {
      root.render(<AgileSprintSelect agileId="agile-id" sprint={sprint} />);
    });

    const data = mockMakeDataset([sprint]);

    expect(data[0].description).toBe('1 Jan — 2 Dec');
  });

  it('should format dates correctly. Two dates and same month', () => {
    const sprint = {
      id: 'sprint-id',
      name: 'sprint-name',
      from: new Date('2021-12-12'),
      to: new Date('2021-12-24'),
    };
    act(() => {
      root.render(<AgileSprintSelect agileId="agile-id" sprint={sprint} />);
    });

    const data = mockMakeDataset([sprint]);

    expect(data[0].description).toBe('12 — 24 Dec');
  });

  it('should format dates correctly. Only from date and current year', () => {
    const from = new Date();
    from.setMonth(11);
    from.setDate(12);
    const sprint = {
      id: 'sprint-id',
      name: 'sprint-name',
      from: from,
      to: undefined,
    };
    act(() => {
      root.render(<AgileSprintSelect agileId="agile-id" sprint={sprint} />);
    });

    const data = mockMakeDataset([sprint]);

    expect(data[0].description).toBe('12 Dec');
  });

  it('should format dates correctly. Only from date and past year', () => {
    const sprint = {
      id: 'sprint-id',
      name: 'sprint-name',
      from: new Date('2000-11-02'),
      to: undefined,
    };
    act(() => {
      root.render(<AgileSprintSelect agileId="agile-id" sprint={sprint} />);
    });

    const data = mockMakeDataset([sprint]);

    expect(data[0].description).toBe('2 Nov 2000');
  });

  it('should format dates correctly. Only from date and future year', () => {
    const sprint = {
      id: 'sprint-id',
      name: 'sprint-name',
      from: new Date('2098-09-24'),
      to: undefined,
    };
    act(() => {
      root.render(<AgileSprintSelect agileId="agile-id" sprint={sprint} />);
    });

    const data = mockMakeDataset([sprint]);

    expect(data[0].description).toBe('24 Sep 2098');
  });

  it('should format dates correctly. Only to date and current year', () => {
    const to = new Date();
    to.setMonth(1);
    to.setDate(28);
    const sprint = {
      id: 'sprint-id',
      name: 'sprint-name',
      from: undefined,
      to: to,
    };
    act(() => {
      root.render(<AgileSprintSelect agileId="agile-id" sprint={sprint} />);
    });

    const data = mockMakeDataset([sprint]);

    expect(data[0].description).toBe('28 Feb');
  });

  it('should format dates correctly. Only to date and past year', () => {
    const sprint = {
      id: 'sprint-id',
      name: 'sprint-name',
      from: undefined,
      to: new Date('2009-07-17'),
    };
    act(() => {
      root.render(<AgileSprintSelect agileId="agile-id" sprint={sprint} />);
    });

    const data = mockMakeDataset([sprint]);

    expect(data[0].description).toBe('17 Jul 2009');
  });

  it('should format dates correctly. Only to date and future year', () => {
    const sprint = {
      id: 'sprint-id',
      name: 'sprint-name',
      from: undefined,
      to: new Date('2099-08-16'),
    };
    act(() => {
      root.render(<AgileSprintSelect agileId="agile-id" sprint={sprint} />);
    });

    const data = mockMakeDataset([sprint]);

    expect(data[0].description).toBe('16 Aug 2099');
  });
});