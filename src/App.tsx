import { CssBaseline, Paper } from '@mui/material';
import { Box } from '@mui/system';
import './App.css';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Box>
      <CssBaseline />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}>
        <BottomNav />
      </Paper>
    </Box>
  );
}

export default App;
