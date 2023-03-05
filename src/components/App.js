import '@jetbrains/ring-ui/dist/style.css';
import './App.css';

import { ThemeProvider } from 'styled-components';
import AgileBoard from './AgileBoard';
import { Routes, Route } from 'react-router-dom';
import { PrivateOutlet } from '../utils/PrivateOutlet';

const theme = {
    primaryFontSize: '14px',
    secondaryColor: '#737577',
    linkColor: '#0f5b99',
    lineHeight: '20px',
    unit: '8px'
};

function App() {
  // const issues = useSelector(selectAllIssues);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="*" element={<PrivateOutlet />}>
            <Route index element={<AgileBoard/>} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
