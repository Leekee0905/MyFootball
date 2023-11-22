import { useRouter } from '../../hooks/useRouter';
import { Button } from '@mui/material';
const Home = () => {
  const { routeTo } = useRouter();
  return (
    <>
      Home
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
