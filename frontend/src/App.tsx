import { RouterProvider } from 'react-router-dom';
import { routers } from './router';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={routers} />
    </ThemeProvider>
  );
}

export default App;
