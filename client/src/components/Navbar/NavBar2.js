import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography, IconButton, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import decode from "jwt-decode";

import useStyles from './styles2';
import memories from '../../images/memories.png';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    history.push('/');
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h6" >Memories</Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <Grid container direction="row" justify="flex-end" alignItems="center" spacing={3}>
            <Grid item>
              <Avatar className={classes.avatar} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            </Grid>
            <Grid item>
              <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </Grid>
          </Grid>
        ) : (
          <Button component={Link} to="/auth" color="inherit">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
