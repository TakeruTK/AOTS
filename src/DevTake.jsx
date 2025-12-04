
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import './index.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c0c0c0', // Silver
    },
    secondary: {
      main: '#b8860b', // Gold
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'serif',
    h1: {
      fontFamily: 'serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'serif',
      fontWeight: 700,
    },
  },
});

function DevTake() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default DevTake;
