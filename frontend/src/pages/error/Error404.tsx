import { Container, Box, Typography, Button } from '@mui/material';
import { useRouter } from '../../hooks/useRouter';

const Error404 = () => {
  const { routeTo } = useRouter();

  return (
    <Container
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Typography variant="h1" fontWeight={'bold'}>
          404
        </Typography>
        <Typography sx={{ marginLeft: '24px' }} variant="h2">
          Not Found
        </Typography>
      </Box>
      <Button sx={{ border: '1px solid' }} onClick={() => routeTo('/')}>
        <Typography variant="h5">홈으로</Typography>
      </Button>
    </Container>
  );
};

export default Error404;
