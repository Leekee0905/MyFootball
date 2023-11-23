import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useRouter } from '../hooks/useRouter';

const pages = ['홈', '자유게시판', '일정', '테이블']
const settings = ['프로필', '계정', '내가 쓴 글', '로그아웃'];

const Header = () => {
  const theme = useTheme();
  const { routeTo } = useRouter();
  const [openUser, setOpenUser] = useState<null | HTMLElement>(null);
  const handleOpenUserIcon = (e:React.MouseEvent<HTMLElement>) => {
    setOpenUser(e.currentTarget);
  }

  const handleCloseUserIcon = () => {
    setOpenUser(null);
  }

  const handleNavigateButton = (e:React.MouseEvent<HTMLElement>) => {
    switch(e.currentTarget.innerText){
      case 'MyFootBall':{
        routeTo('/');
        break;
      }
      case '홈':{
        routeTo('/');
        break;
      }
      case '자유게시판':{
        routeTo('/freeboard');
        break;
      }
      case '일정':{
        routeTo('/schedule');
        break;
      }
      case '테이블':{
        routeTo('/table');
        break;
      }
      default:{
        break;
      }
    }
  }

  return (
    <AppBar position="sticky">
        <Toolbar>
          <Box onClick={handleNavigateButton} sx={{font: theme.typography.fontFamily, color: theme.palette.secondary.main, cursor: 'pointer'}}>
            <Typography variant="h4" sx={{ font: theme.typography.fontFamily }}>
              MyFootBall
            </Typography>
          </Box>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleNavigateButton}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserIcon} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={openUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(openUser)}
              onClose={handleCloseUserIcon}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>handleCloseUserIcon}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>


    </AppBar>
  );
};

export default Header;
