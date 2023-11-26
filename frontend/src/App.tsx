import { RouterProvider } from 'react-router-dom';
import { routers } from './router';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routers} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
