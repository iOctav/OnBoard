import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileCardPreview from '../index';


jest.mock('../../LazySelectBox', () => ({customAnchor, children}) => {
  return (<div data-testid="lazy-select-box">{customAnchor({},{},{})}{children}</div>);
});

describe('AgileCardPreview', () => {
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

  it('should render AgileCardPreview with props', () => {
    const issueData = {
      summary: 'summary',
    }
    act(() => {
      root.render(<AgileCardPreview issueData={issueData}/>);
    });

    expect(screen.getByTestId('agile-card-preview')).toBeInTheDocument();
    expect(screen.getByText(issueData.summary)).toBeInTheDocument();
  });

  it('should render AgileCardPreview empty if summary is not presented', () => {
    const issueData = {}
    act(() => {
      root.render(<AgileCardPreview issueData={issueData}/>);
    });

    expect(screen.getByTestId('agile-card-preview')).toBeInTheDocument();
    expect(screen.getByTestId('summary-span').textContent).toBe('');
  });
});