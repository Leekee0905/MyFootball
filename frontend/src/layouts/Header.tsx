import { AppBar, Toolbar, Typography, useTheme } from '@mui/material';

const Header = () => {
  const theme = useTheme();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4" sx={{ font: theme.typography.fontFamily }}>
          MyFootBall
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
