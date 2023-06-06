import ReactDOMClient from 'react-dom/client';
import { act, screen } from '@testing-library/react';
import React from 'react';
import SettingsControl from '../index';

describe('SettingsControl', () => {
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

  it('should render SettingsControl', () => {
    act(() => {
      root.render(<SettingsControl/>);
    });

    expect(screen.getByTestId('labelled-control')).toBeInTheDocument();
  });

  it('should render SettingsControl with props', () => {
    const label='test-title';
    act(() => {
      root.render(<SettingsControl label={label}>
        <div data-testid="test-child">control</div>
      </SettingsControl>);
    });

    expect(screen.getByTestId('labelled-control')).toBeInTheDocument();
    expect(screen.getByTestId('settings-label')).toHaveTextContent(label);
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('should render SettingsControl with several controls', () => {
    act(() => {
      root.render(<SettingsControl label="test-title">
        <div data-testid="test-child-1">control 1</div>
        <div data-testid="test-child-2">control 2</div>
      </SettingsControl>);
    });

    expect(screen.getByTestId('labelled-control')).toBeInTheDocument();
    expect(screen.getByTestId('test-child-1')).toBeInTheDocument();
    expect(screen.getByTestId('test-child-2')).toBeInTheDocument();
  });

  it('should render SettingsControl without controls', () => {
    act(() => {
      root.render(<SettingsControl label="test-title"/>);
    });

    expect(screen.getByTestId('labelled-control')).toBeInTheDocument();
    expect(screen.getByTestId('control-container').children.length).toBe(0);
  });

  it('should render SettingsControl without label', () => {
    act(() => {
        root.render(<SettingsControl>
          <div data-testid="test-child">control</div>
        </SettingsControl>);
    });

    expect(screen.getByTestId('labelled-control')).toBeInTheDocument();
    expect(screen.getByTestId('settings-label')).toBeEmptyDOMElement();
  });
});
