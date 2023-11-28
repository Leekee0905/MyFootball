import { Box, CircularProgress } from '@mui/material';

const LoadingCircular = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingCircular;
