import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import GeneralSettings from '../index';

let mockInput;
jest.mock('@jetbrains/ring-ui/dist/input/input', () => ({
  __esModule: true,
  Size: { S: 'S', M: 'M', L: 'L', AUTO: 'AUTO' },
  default: ({children, onChange}) => {
    mockInput = (event) => onChange(event);
    return (<input data-testid="input">{children}</input>);
  }})
);
jest.mock('@jetbrains/ring-ui/dist/button-group/button-group', () =>
  ({children}) => (<div data-testid="button-group">{children}</div>));
jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<button data-testid="button">{children}</button>));
jest.mock('../../LazySelectBox', () => ({children}) =>
  (<div data-testid="lazy-select-box">{children}</div>));
jest.mock('../../LazyTagBox', () => ({children}) =>
  (<div data-testid="lazy-tag-box">{children}</div>));
jest.mock('../../SettingsControl', () => () =>
  (<div data-testid="settings-control"/>));
jest.mock('../BoardBehaviorControl', () => () =>
  (<div data-testid="board-behavior-control"/>));
jest.mock('../UsersGroupsSelect', () => () =>
  (<div data-testid="board-behavior-control"/>));
jest.mock('../../../app/services/youtrackApi', () => ({
  useLazyGetProjectsQuery: () => [jest.fn()],
  useLazyGetUsersQuery: () => [jest.fn()],
}));

describe('GeneralSettings', () => {
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

  it('should render GeneralSettings with props', () => {
    const owner = {
      id: 'owner-id',
      fullName: 'owner-full-name',
    };
    const sprintsSettings = {
      disableSprints: false,
      addNewIssueToKanban: false,
      isExplicit: false,
      explicitQuery: undefined,
      hideSubtasksOfCards: false,
      defaultSprint: 'default-sprint',
      sprintSyncField: 'sprint-sync-field',
    };
    const readSharingSettings = {
      permittedGroups: [],
      permittedUsers: [],
      projectBased: true,
    };
    const updateSharingSettings = {
      permittedGroups: [],
      permittedUsers: [],
      projectBased: true,
    };
    act(() => {
      root.render(<GeneralSettings agileId="agile-id" agileName="agile-name" initialOwner={owner}
                                   sprintsSettings={sprintsSettings} projects={[]}
                                   readSharingSettings={readSharingSettings}
                                   updateSharingSettings={updateSharingSettings}/>);
    });

    expect(screen.getByTestId('general-settings')).toBeInTheDocument();
  });
});