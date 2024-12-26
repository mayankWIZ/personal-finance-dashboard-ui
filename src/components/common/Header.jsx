import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const pages = {
  dashboard: {
    name: 'Dashboard',
    key: 'dashboard',
    path: '/',
    scopes: ['me'],
  },
  transactions: {
    name: 'Transactions',
    key: 'transactions',
    path: '/transactions',
    scopes: ['me', 'transaction_read'],
  },
  bulkTransactions: {
    name: 'Transactions Import/Export',
    key: 'bulkTransactions',
    path: '/bulk-transactions',
    scopes: ['admin', 'transaction_read'],
  },
  users: {
    name: 'Users',
    key: 'users',
    path: '/users',
    scopes: ['me'],
  },
};

function ResponsiveAppBar() {
  const { toggleTheme } = useTheme();
  const { hasScopes, authState, logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const settings = {
    change_password: {
      name: 'Change Password',
      key: 'change_password',
      path: '/change-password',
      scopes: ['me'],
    },
    logout: {
      name: 'Logout',
      key: 'logout',
      handler: () => {
        handleCloseNavMenu();
        handleCloseUserMenu();
        logout();
      },
      scopes: ['me'],
    },
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateTo = (path) => {
    handleCloseNavMenu();
    handleCloseUserMenu();
    navigate(path);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MonetizationOnIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: "1.8rem" }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PFD
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {
                Object.values(pages).map((page) => {
                  if (!hasScopes(page.scopes)) return null;
                  return  (
                    <MenuItem key={page.key} onClick={() => navigateTo(page.path)}>
                      <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                    </MenuItem>
                  )
                })
              }
            </Menu>
          </Box>
          <MonetizationOnIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontSize: "2rem" }} />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PFD
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {
              Object.values(pages).map((page) => {
                if (!hasScopes(page.scopes)) return null;
                return  (
                  <Button
                    key={page.key}
                    onClick={() => navigateTo(page.path)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                )
              })
            }
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <FormGroup>
              <FormControlLabel control={<Switch onClick={toggleTheme} size='small' />} label="Toggle Theme" labelPlacement="top" />
            </FormGroup>
          </Box>
          {authState.isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={authState.username} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {Object.values(settings).map((setting) => {
                  if (!hasScopes(setting.scopes)) return null;
                  return (
                    <MenuItem key={setting.key} onClick={ setting.handler ? setting.handler : () => navigateTo(setting.path)}>
                      <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                    </MenuItem>
                  )
                })}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
