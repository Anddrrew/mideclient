import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthContextProvider } from './contexts/AuthContext';
import Router from './router';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </ThemeProvider>
  );
}
