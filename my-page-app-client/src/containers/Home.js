import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import zima from "../img/zima.png";
import qiwei from "../img/qiwei.png";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
// import "./HomeView.css"
import Paper from '@material-ui/core/Paper';


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
    [theme.breakpoints.up(400)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 4,
    minHeight: 350,
    backgroundColor: '#f5f5f5',
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 5,
      padding: theme.spacing.unit * 2,
      minHeight: 450,
      backgroundColor: '#f5f5f5',
    },
  },
  avatar: {
    margin: 20,
    width: 80,
    height: 80,
    marginTop: theme.spacing.unit * 3,
  },
  name: {
    padding: theme.spacing.unit * 3,
    fontWeight: 300,
    fontSize: '2rem',
    lineHeight: 2,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
  },
  p: {
    maxWidth: 450,
    fontSize: '1.1rem',
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 300,
    lineHeight: 1.7,
    lineSpacing: 12,
    letterSpacing: 0.1,
    
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      padding: theme.spacing.unit * 5,
    },
  }
});

function Home(props) {
  const { classes } = props;

  return (
      <div className={classes.root}>
      <Paper elevation='10' className={classes.paper}>
        <Grid container justify="center" alignItems="center">
          <Avatar alt="Qiwei Y" src={qiwei} className={classes.avatar} />
          <Typography variant='h4' className={classes.name}>Qiwei Yang</Typography>
        </Grid>
        <Typography gutterBottom variant='body1' className={classes.p}>Penultimate year Computer Science student from UNSW Sydney / Part-time Developer</Typography>
        <Typography gutterBottom variant='body1' className={classes.p}>Looking for a software developer summer internship</Typography>
        <Typography gutterBottom variant='body1' className={classes.p}>My email: <a href = "mailto: yangqiwei97@gmail.com">yangqiwei97@gmail.com</a></Typography>
      </Paper>
      </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);