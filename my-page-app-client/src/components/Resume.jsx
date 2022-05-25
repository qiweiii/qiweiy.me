import React from 'react'
import withStyles from '@mui/styles/withStyles'
import resume from '../Resume.pdf'

const styles = (theme) => ({
  iframe: {
    width: 350,
    height: 600,
    display: 'block',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      width: 800,
      height: 800,
      maxWidth: 1000,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
})

class Resume extends React.Component {
  render() {
    const { classes } = this.props
    return <iframe title="resume" className={classes.iframe} src={resume}></iframe>
  }
}

export default withStyles(styles)(Resume)
