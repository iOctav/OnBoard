import '@jetbrains/ring-ui/dist/style.css';
import './App.css';

import { ThemeProvider } from 'styled-components';
import { useGetCurrentSprintForSpecificAgileQuery } from '../store/youtrackApi';
import AgileBoard from './AgileBoard';

const theme = {
    primaryFontSize: '14px',
    secondaryColor: '#737577',
    linkColor: '#0f5b99',
    lineHeight: '20px',
    unit: '8px'
};

function App() {
  const { data: agile,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCurrentSprintForSpecificAgileQuery('131-2')

  let content

  if (isLoading) {
    content = <span>Loading</span>
  } else if (isSuccess) {
    content = <AgileBoard sprint={agile}/>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
  // const issues = useSelector(selectAllIssues);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {content}
      </div>
    </ThemeProvider>
  );
}

export default App;
