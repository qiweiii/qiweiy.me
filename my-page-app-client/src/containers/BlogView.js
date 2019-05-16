import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      maxWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  uploads: {
    paddingBottom: '10px',
  },
  input: {
    display: 'none',
  },
  submit: {
    marginBottom: 20,
  }
});


class BlogView extends React.Component {
  
  render() {
    return 
  }

}


BlogView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogView);