import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import resume from "../Resume.pdf";

const styles = theme => ({
  iframe: {
    width: 350,
    height: 600,
    display: 'block',
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
    [theme.breakpoints.up('sm')]: {
      width: 800,
      height: 800,
      maxWidth: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
});

class Resume extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <iframe title="resume" className={classes.iframe} src={resume}>
      </iframe>
    );
  }
}

Resume.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Resume);