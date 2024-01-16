import { RouterProvider } from 'react-router-dom';
import { routers } from './router';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ImageProvider } from './hooks/usePreloadImage';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ImageProvider>
          <RouterProvider router={routers} />
        </ImageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
