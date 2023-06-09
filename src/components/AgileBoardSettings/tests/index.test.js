import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileBoardSettings from '../index';

jest.mock('@jetbrains/ring-ui/dist/tabs/tabs', () => ({
  Tabs: ({children}) => (<div data-testid="tabs">{children}</div>),
  Tab: ({children}) => <div data-testid="tab">{children}</div>
}));

jest.mock('../../ColumnsSettings', () => ({disabled}) =>
  (<div data-testid="columns-settings" disabled={disabled}/>));
jest.mock('../../SwimlanesSettings', () => ({disabled, projectShortNames}) =>
  (<div data-testid="swimlanes-settings" disabled={disabled}>{projectShortNames?.join(',')}</div>));
jest.mock('../../ChartSettings', () => ({disabled}) =>
  (<div data-testid="chart-settings" disabled={disabled} />));
jest.mock('../../GeneralSettings', () => ({disabled}) =>
  (<div data-testid="general-settings" disabled={disabled} />));
jest.mock('../../CardSettings', () => ({disabled}) =>
  (<div data-testid="card-settings" disabled={disabled} />));
jest.mock('../../NestedSwimlanesSettings', () => ({disabled, projectShortNames}) =>
  (<div data-testid="ns-settings" disabled={disabled}>{projectShortNames?.join(',')}</div>));
jest.mock('../YouTrackAgileSettingsLink', () => (props) =>
  (<div data-testid="youtrack-settings-link" />));


describe('AgileBoardSettings', () => {
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

  it('should render AgileBoardSettings with props', () => {
    act(() => {
      root.render(<AgileBoardSettings visible agileId="agile-id" agileName="agile-name" sprintId="sprint-id"/>);
    });

    expect(screen.getByTestId('agile-board-settings')).toBeInTheDocument();
  });

  it('should not render AgileBoardSettings when visible is false', () => {
    act(() => {
      root.render(<AgileBoardSettings visible={false} agileId="agile-id" agileName="agile-name" sprintId="sprint-id"/>);
    });

    expect(screen.queryByTestId('agile-board-settings')).not.toBeInTheDocument();
  });

  const itif = process.env.REACT_APP_YOUTRACK_SETTINGS_DISABLED === 'true' ? it : it.skip;
  itif('should provide disable in all settings except nested swimlanes', () => {
    act(() => {
      root.render(<AgileBoardSettings visible disabled={true} agileId="agile-id" agileName="agile-name" sprintId="sprint-id"/>);
    });

    expect(screen.getByTestId('columns-settings')).toHaveAttribute('disabled');
    expect(screen.getByTestId('general-settings')).toHaveAttribute('disabled');
    expect(screen.getByTestId('card-settings')).toHaveAttribute('disabled');
    expect(screen.getByTestId('chart-settings')).toHaveAttribute('disabled');
    expect(screen.getByTestId('swimlanes-settings')).toHaveAttribute('disabled');
    expect(screen.getByTestId('ns-settings')).not.toHaveAttribute('disabled');
  });

  it('should provide project names into ns and swimlanes settings if projects are set', () => {
    const projects = [
      {
        shortName: 'project-1',
      },
      {
        shortName: 'project-2',
      }
    ];
    act(() => {
      root.render(<AgileBoardSettings visible projects={projects} disabled={true} agileId="agile-id" agileName="agile-name" sprintId="sprint-id"/>);
    });

    expect(screen.getByTestId('swimlanes-settings').textContent).toBe('project-1,project-2');
    expect(screen.getByTestId('ns-settings').textContent).toBe('project-1,project-2');
  });
});
