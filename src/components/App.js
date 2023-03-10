import '@jetbrains/ring-ui/dist/style.css';
import './App.css';

import { ThemeProvider } from 'styled-components';
import AgilePage from './AgilePage';

const theme = {
    primaryFontSize: '14px',
    secondaryColor: '#737577',
    linkColor: '#0f5b99',
    lineHeight: '20px',
    unit: '8px'
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AgilePage/>
      </div>
    </ThemeProvider>
  );
}

export default App;
