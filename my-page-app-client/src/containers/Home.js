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
  },
  h1: {
    font: 'Roboto',
    fontWeight: 300,
    color: '#212121',
  }
});

function Home(props) {
  const { classes } = props;

  return (
    <div>
      <div className={classes.root}>
        <h1 className={classes.h1}>Qiwei Yang</h1>
        <p>Penultimate year computer science student from UNSW Sydney</p>
        <p>Looking for a software developer internship/part-time job</p>
        <p>My email: <a href = "mailto: yangqiwei97@gmail.com">yangqiwei97@gmail.com</a></p>
      </div>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);