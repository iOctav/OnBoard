import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import ChartSettings from '../index';

let mockInput;
jest.mock('@jetbrains/ring-ui/dist/input/input', () => ({children, onChange}) => {
  mockInput = (event) => onChange(event);
  return (<input data-testid="input">{children}</input>);
});
jest.mock('@jetbrains/ring-ui/dist/button-group/button-group', () =>
  ({children}) => (<div data-testid="button-group">{children}</div>));
jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<button data-testid="button">{children}</button>));
jest.mock('../../SettingsControl', () => () =>
  (<div data-testid="settings-control"/>));

describe('ChartSettings', () => {
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

  it('should render ChartSettings with props', () => {
    const reportSettings = {
      doNotUseBurndown: false,
      filterType: {
        id: 'filterType',
      },
      subQuery: 'subQuery',
    };
    act(() => {
      root.render(<ChartSettings reportSettings={reportSettings}/>);
    });

    expect(screen.getByTestId('chart-settings')).toBeInTheDocument();
  });
});