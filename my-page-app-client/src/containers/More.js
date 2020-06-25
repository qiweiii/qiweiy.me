import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
  root: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(5)}px`,
    // color: '#616161',
    fontSize: 14,
    [theme.breakpoints.down(400)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  text: {
    alignContent: 'center',
    textAlign: 'left',
  },
  h1: {
    // font: 'Roboto',
    fontWeight: 300,
    // color: '#212121',
  },
  p: {
    maxWidth: 450,
  }
});

function More(props) {
  const { classes } = props;
  return (

      <div className={classes.root}>
        <div className={classes.text}>
          <h1 className={classes.h1}>Future</h1>
          <p className={classes.p}>Add tags to blogs.</p>
          <a href="https://github.com/rexxars/react-markdown/blob/master/demo/src/demo.js" rel="noopener noreferrer" target="_blank" className={classes.p}>Add live markdown preview for blog editor.</a>
          <p className={classes.p}>Nicer style.</p>
          <br/>
          <p className={classes.p}>My email: <a href = "mailto: yangqiwei97@gmail.com">yangqiwei97@gmail.com</a></p>
        </div>
      </div>

  );
}

More.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(More);