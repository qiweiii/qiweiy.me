import React from 'react'
import withStyles from '@mui/styles/withStyles'

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(20),
    alignItems: 'center',
    alignContent: 'center',
    padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(5)}`,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 200,
    color: '#999'
  }
})

function NotFound(props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <h3>Sorry, page not found</h3>
    </div>
  )
}

export default withStyles(styles)(NotFound)
