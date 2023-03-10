import { Paper } from '@mui/material';
import './App.css';
import SentencePage from './components/SentencePage';

function App() {
  return (
    <Paper
      elevation={2}
      className='App'>
      <SentencePage />
    </Paper>
  );
}

export default App;
