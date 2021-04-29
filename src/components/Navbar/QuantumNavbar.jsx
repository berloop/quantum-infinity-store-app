import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';

import Quantumlogo from '../../assets/logo.svg'
import useStyles from './styles';

const QuantumNavbar = ({totalItems}) => {
  const classes = useStyles();
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const location = useLocation();

  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  // const mobileMenuId = 'primary-search-account-menu-mobile';

    return (
        <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component ={Link} to="/" variant="h6" className={classes.title} color="inherit">Quantum Infinity™ Store.
          </Typography>
          <div className={classes.grow} />
          
      {location.pathname  === '/' && (
        <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div> )}
        </Toolbar>
      </AppBar>
    </>
    )
}

export default QuantumNavbar;
