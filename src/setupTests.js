// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  Trans: ({children}) => children,
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  }
}));

jest.mock('@jetbrains/ring-ui/dist/table/selection', () => {
  return jest.fn().mockImplementation(({ data }) => {
    return {
      select: jest.fn(),
      deselect: jest.fn(),
      isSelected: jest.fn(),
      getSelectedItems: jest.fn(),
      getAllSelected: jest.fn(),
    };
  });
});

jest.mock('@jetbrains/ring-ui/dist/input/input', () => ({
  Size: { S: 'S', M: 'M', L: 'L', AUTO: 'AUTO' },
}));
jest.mock('@jetbrains/ring-ui/dist/global/controls-height', () => ({
  ControlsHeight: { S: 'S', M: 'M', L: 'L' },
  ControlsHeightContext: {
    Provider: () => jest.fn()
  },
}));
jest.mock('@jetbrains/ring-ui/dist/icon', () => ({
  Size: {
    Size12: 12,
    Size14: 14,
    Size16: 16,
    Size18: 18,
    Size20: 20,
    Size24: 24,
    Size32: 32,
    Size40: 40,
    Size48: 48,
    Size64: 64,
    Size96: 96,
    Size128: 128
  }
}));

jest.mock('@jetbrains/icons', () => {
  const icons = {
    __esModule: true,
  };

  const handler = {
    get: function (_, prop) {
      return () => <div className={`mock_${prop}Icon`} />;
    },
  };

  return new Proxy(icons, handler);
});

jest.mock('@jetbrains/ring-ui/dist/global/theme', () => ({
  useTheme: () => jest.fn(),
}));

jest.mock('@jetbrains/ring-ui/dist/alert-service/alert-service', () => jest.fn());
