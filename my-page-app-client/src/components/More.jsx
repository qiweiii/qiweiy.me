import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
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
      marginRight: 'auto'
    }
  },
  text: {
    alignContent: 'center',
    textAlign: 'left'
  },
  h1: {
    fontWeight: 300
  },
  p: {
    maxWidth: 450
  }
})

function More(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <div className={classes.text}>
        <h1 className={classes.h1}>Future</h1>
        <p className={classes.p}>Better performance.</p>
        <p className={classes.p}>Nicer style.</p>
        <p className={classes.p}>More blogs.</p>
        <br />
        <p className={classes.p}>
          My email: <a href="mailto: yangqiwei97@gmail.com">yangqiwei97@gmail.com</a>
        </p>
      </div>
    </div>
  )
}

export default withStyles(styles)(More)
