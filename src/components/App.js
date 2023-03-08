import '@jetbrains/ring-ui/dist/style.css';
import './App.css';

import { ThemeProvider } from 'styled-components';
import {Routes, Route, Navigate} from 'react-router-dom';
import { AuthOutlet } from '../features/auth/AuthOutlet';
import AgilePage from './AgilePage';
import RedirectPage from './RedirectPage';

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
          <Route path="/" element={<AuthOutlet />}>
            <Route index element={<Navigate to="/agiles" />} />
          </Route>
          <Route path="/agiles" element={<AuthOutlet />}>
            <Route index element={<AgilePage/>} />
          </Route>
          <Route path="*" element={<RedirectPage/>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
