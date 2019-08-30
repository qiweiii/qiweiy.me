import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 5}px`,
    color: '#616161',
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
    font: 'Roboto',
    fontWeight: 300,
    color: '#212121',
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
          <p className={classes.p}>Add tags to blogs, allow user to click on and see blogs under the different tags.</p>
          <a href="https://github.com/rexxars/react-markdown/blob/master/demo/src/demo.js" rel="noopener noreferrer" target="_blank" className={classes.p}>Add Live Editor.</a>
          <p className={classes.p}>Implement file upload function.</p>
          <p className={classes.p}>User dashboards.</p>
          <p className={classes.p}>Nicer font for blogs.</p>
          <p className={classes.p}>Infinite Scroll (when i have more blogs).</p>
          <br/>
          <p className={classes.p}>[Any advise is welcomed]</p>
          <p className={classes.p}>My email: <a href = "mailto: yangqiwei97@gmail.com">yangqiwei97@gmail.com</a></p>
        </div>
      </div>

  );
}

More.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(More);