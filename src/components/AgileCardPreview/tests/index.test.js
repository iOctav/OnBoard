import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileCardPreview from '../index';

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
});