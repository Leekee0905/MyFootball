import { Grid, Typography, Box, Link, useTheme } from '@mui/material';

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
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">About Us</Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Follow Us</Typography>
          <div>
            <Link href="#" color="inherit" sx={{ marginRight: 1 }}>
              f
            </Link>
            <Link href="#" color="inherit" sx={{ marginRight: 1 }}>
              t
            </Link>
            <Link href="#" color="inherit" sx={{ marginRight: 1 }}>
              i
            </Link>
            <Link href="#" color="inherit">
              y
            </Link>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Contact Us</Typography>
          <Typography variant="body2">Email: contact@example.com</Typography>
          <Typography variant="body2">Phone: +1 234 567 890</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
