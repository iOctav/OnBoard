import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import YouTrackAgileSettingsLink from '../YouTrackAgileSettingsLink';

jest.mock('@jetbrains/ring-ui/dist/link/link', () => ({href, target, children}) =>
  (<a data-testid="link" href={href} target={target}>{children}</a>));

jest.mock('@jetbrains/ring-ui/dist/alert/alert', () => {
  const alert = ({children}) => {
    return (<div data-testid="alert">{children}</div>);
  }
  alert.Type = {
    'WARNING': 'warning',
  }
  return alert;
});

describe('YouTrackAgileSettingsLink', () => {
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

  it('should render YouTrackAgileSettingsLink with props', () => {
    act(() => {
      root.render(<YouTrackAgileSettingsLink agileId="agile-id" sprintId="sprint-id"/>);
    });

    expect(screen.getByTestId('alert')).toBeInTheDocument();
  });

  it('should render YouTrackAgileSettingsLink with title', () => {
    const title = 'title';
    act(() => {
      root.render(<YouTrackAgileSettingsLink agileId="agile-id" sprintId="sprint-id" title={title}/>);
    });

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should render YouTrackAgileSettingsLink with linkId', () => {
    const title = 'title';
    const linkId = 'link-id';
    act(() => {
      root.render(<YouTrackAgileSettingsLink agileId="agile-id" sprintId="sprint-id" title={title} linkId={linkId}/>);
    });

    const link = screen.getByText(title);
    expect(link).toBeInTheDocument();
    expect(link.href).toBe(`http://localhost/agiles/agile-id/sprint-id?tab=${linkId}&settings`);
  });
});
