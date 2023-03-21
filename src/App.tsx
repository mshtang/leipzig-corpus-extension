import { CssBaseline, Paper } from '@mui/material';
import { Box } from '@mui/system';
import './App.css';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Box id='appBox'>
      <CssBaseline />
      <Paper
        id='appBoxPaper'
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          margin: '20px',
          padding: '20px',
        }}
        elevation={3}>
        <BottomNav />
      </Paper>
    </Box>
  );
}

export default App;
