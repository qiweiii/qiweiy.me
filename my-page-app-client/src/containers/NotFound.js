import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// export default () =>
//   <div className="NotFound">
//     <h3>Sorry, page not found!</h3>
//   </div>;



const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 20,
    alignItems: 'center',
    alignContent: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 5}px`,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 200,
    color: '#999',
  }
});

function NotFound(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
    	<h3>Sorry, page not found!</h3>
  	</div>
  );
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);