import './App.css';
import {ThemeProvider} from 'styled-components';
import AgileBoardRow from './AgileBoardRow';
import { selectAllIssues } from '../features/issues/issuesSlice';
import { useSelector } from 'react-redux';

const theme = {
    primaryFontSize: '14px',
    secondaryColor: '#737577',
    linkColor: '#0f5b99',
    lineHeight: '20px',
    unit: '8px'
};

function App() {
  const issues = useSelector(selectAllIssues);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AgileBoardRow cards={issues} states={STATES}/>
      </div>
    </ThemeProvider>
  );
}

export default App;

const STATES = ['Open', 'InProgress', 'Resolved', 'Closed'];
