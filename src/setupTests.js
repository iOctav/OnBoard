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

jest.mock('@jetbrains/ring-ui/dist/global/controls-height', () => ({
  ControlsHeight: { S: 'S', M: 'M', L: 'L' },
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

jest.mock('@jetbrains/ring-ui/dist/list/list', () =>  {
 return null;
});

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
