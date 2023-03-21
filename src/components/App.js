import '@jetbrains/ring-ui/dist/style.css';
import './App.css';

import AgileRoutePage from './AgileRoutePage';
import Theme, { ThemeProvider } from '@jetbrains/ring-ui/dist/global/theme';

function App() {
  return (
    <ThemeProvider theme={Theme.AUTO}>
      <div data-testid="app-container" className="App">
        <AgileRoutePage/>
      </div>
    </ThemeProvider>
  );
}

export default App;
