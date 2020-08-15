import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {AppBar, Toolbar, IconButton, Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {connect} from 'react-redux';
import { selectAmoutAlertNotification } from './../store/alertNotification/reducer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: '100px'
  },
}));

export function TopBar({ activeAlerts }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Atrix Labs Challenge App
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={activeAlerts} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps(state) {
  return {
      activeAlerts: selectAmoutAlertNotification(state)
  }
}

export default connect(mapStateToProps)(TopBar);