import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';

import { useRouter } from '../hooks/useRouter';

const pages = ['홈', '일정', '테이블'];

const Header = () => {
  const theme = useTheme();
  const { routeTo } = useRouter();

  const handleNavigateButton = (e: React.MouseEvent<HTMLElement>) => {
    switch (e.currentTarget.innerText) {
      case 'MyFootBall': {
        routeTo('/');
        break;
      }
      case '홈': {
        routeTo('/');
        break;
      }
      case '일정': {
        routeTo('/schedule');
        break;
      }
      case '테이블': {
        routeTo('/table');
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        minHeight: '100px',
      }}
    >
      <Toolbar>
        <Box
          onClick={handleNavigateButton}
          sx={{
            cursor: 'pointer',
          }}
        >
          <Typography variant="h3" sx={{ font: theme.typography.fontFamily }}>
            MyFootBall
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            padding: theme.spacing(1),
          }}
        >
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleNavigateButton}
              sx={{
                my: 2,
                display: 'block',
                paddingX: theme.spacing(3),
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  font: theme.typography.fontFamily,
                  color: theme.palette.secondary.main,
                }}
              >
                {page}
              </Typography>
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
