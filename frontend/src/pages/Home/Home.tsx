import { useRouter } from '../../hooks/useRouter';
import { Button, Typography, useTheme } from '@mui/material';
const Home = () => {
  const { routeTo } = useRouter();  
  const theme = useTheme();
  return (
    <>
      Home
      <Typography
        color="secondary"
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        TEST
      </Typography>
      <Button
        onClick={() => {
          routeTo('/login');
        }}
      >
        로그인
      </Button>
    </>
  );
};

export default Home;
