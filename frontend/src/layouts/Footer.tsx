import {
  Grid,
  Typography,
  Box,
  Link,
  useTheme,
  Container,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        padding: '20px 0',
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">About Page</Typography>
            <Typography variant="body2">해외 축구 일정 및 테이블</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">API By</Typography>
            <div>
              <Link
                href="https://www.football-data.org"
                color="inherit"
                sx={{ marginRight: 1, textDecoration: 'none' }}
              >
                https://www.football-data.org
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Made By LeeKee0905</Typography>
            <Typography variant="body2" sx={{ marginY: '12px' }}>
              Email: cj8928@gmail.com
            </Typography>
            <Typography variant="body2">
              Blog:{' '}
              <Link
                href="https://velog.io/@leekee0905"
                color="inherit"
                sx={{ marginRight: 1, textDecoration: 'none' }}
              >
                https://velog.io/@leekee0905
              </Link>
            </Typography>
            <Box
              sx={{
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'left',
                marginY: '12px',
                alignItems: 'center',
              }}
            >
              <GitHubIcon />
              <Typography>:</Typography>
              <Typography variant="body2">
                <Link
                  href="https://github.com/Leekee0905"
                  color="inherit"
                  sx={{
                    marginLeft: 1,
                    textDecoration: 'none',
                  }}
                >
                  https://github.com/Leekee0905
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
