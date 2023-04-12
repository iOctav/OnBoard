import '@jetbrains/ring-ui/dist/style.css';
import './App.css';

import AgileRoutePage from './AgileRoutePage';
import Theme, { ThemeProvider } from '@jetbrains/ring-ui/dist/global/theme';
import SilentTokenRenew from '../features/auth/SilentTokenRenew';
import * as PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

DndProvider.propTypes = {
  backend: PropTypes.any,
  children: PropTypes.node
};

function App() {
  return (
    <ThemeProvider theme={Theme.AUTO}>
      <DndProvider backend={HTML5Backend}>
        <div data-testid="app-container" className="App">
	  <AgileRoutePage/>
        </div>
      </DndProvider>
      <SilentTokenRenew/>
    </ThemeProvider>
  );
}

export default App;
