import '@jetbrains/ring-ui/dist/style.css';
import './App.css';

import { ThemeProvider } from 'styled-components';
import AgileBoardRow from './AgileBoardRow';
import { useGetAgilesByIdQuery } from '../store/youtrackApi';

const theme = {
    primaryFontSize: '14px',
    secondaryColor: '#737577',
    linkColor: '#0f5b99',
    lineHeight: '20px',
    unit: '8px'
};

function App() {
  const { data, error, isLoading } = useGetAgilesByIdQuery('131-2')
  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;
  const columnTitles = data.columnSettings.columns.map(column => column.presentation);
  // const issues = useSelector(selectAllIssues);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AgileBoardRow cards={data.currentSprint.issues} columnField={data.columnSettings.field} columnStates={columnTitles}/>
      </div>
    </ThemeProvider>
  );
}

export default App;
