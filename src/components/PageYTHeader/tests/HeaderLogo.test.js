import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import HeaderLogo from '../HeaderLogo';

const mockSize = jest.fn();
const mockGlyph = jest.fn();

jest.mock('@jetbrains/ring-ui/dist/global/theme', () => ({
    __esModule: true,
    useTheme: jest.fn(),
    default: {
      LIGHT: 'light',
    }
  })
);

jest.mock('@jetbrains/ring-ui/dist/header/logo', () => {
  const logo = ({className, glyph, size}) => {
    mockSize(size);
    mockGlyph(glyph);
    return (<div data-testid="logo" className={className}/>);
  }
  logo.Size = {
    Size40: 'Size40',
    Size128: 'Size128',
  }
  return logo;
});

describe('HeaderLogo', () => {
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

  it('should render HeaderLogo with props', () => {
    act(() => {
      root.render(<HeaderLogo isCompact={false}/>);
    });

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('should render compact HeaderLogo',  async() => {
    act(() => {
      root.render(<HeaderLogo isCompact={true}/>);
    });

    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
    expect(logo.className).toContain('compactLogo');
    expect(mockSize).toHaveBeenCalledWith('Size40');
  });

  it('should render not compact HeaderLogo',  async() => {
    act(() => {
      root.render(<HeaderLogo isCompact={false}/>);
    });

    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
    expect(logo.className).not.toContain('compactLogo');
    expect(mockSize).toHaveBeenCalledWith('Size128');
  });
});
