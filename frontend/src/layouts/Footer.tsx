import {
  Grid,
  Typography,
  Box,
  Link,
  useTheme,
  Container,
} from '@mui/material';

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
            <Typography variant="body2">커뮤니티</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">API By</Typography>
            <div>
              <Link
                href="https://www.football-data.org/"
                color="inherit"
                sx={{ marginRight: 1 }}
              >
                https://www.football-data.org/
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Made By LeeKee0905</Typography>
            <Typography variant="body2">Email: cj8928@gmail.com</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
