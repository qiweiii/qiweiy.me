import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 5}px`,
    textAlign: "center",
    color: '#616161',
    fontSize: 14,
    [theme.breakpoints.up(400)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  h1: {
    font: 'Roboto',
    fontWeight: 300,
    color: '#212121',
  },
  p: {
    maxWidth: 380,
  }
});

function Home(props) {
  const { classes } = props;

  return (

      <div className={classes.root}>
        <h1 className={classes.h1}>Qiwei Yang</h1>
        <p className={classes.p}>[I am still working on this, any advise is welcomed]</p>
        <p className={classes.p}>Penultimate year Computer Science student from UNSW Sydney / Part-time Developer</p>
        <p className={classes.p}>Looking for a software developer summer internship</p>
        <p className={classes.p}>My email: <a href = "mailto: yangqiwei97@gmail.com">yangqiwei97@gmail.com</a></p>
      </div>

  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);