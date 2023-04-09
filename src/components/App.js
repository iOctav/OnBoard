import '@jetbrains/ring-ui/dist/style.css';
import './App.css';

import AgileRoutePage from './AgileRoutePage';
import Theme, { ThemeProvider } from '@jetbrains/ring-ui/dist/global/theme';
import SilentTokenRenew from '../features/auth/SilentTokenRenew';

function App() {
  return (
    <ThemeProvider theme={Theme.AUTO}>
      <div data-testid="app-container" className="App">
        <AgileRoutePage/>
      </div>
      <SilentTokenRenew/>
    </ThemeProvider>
  );
}

export default App;
