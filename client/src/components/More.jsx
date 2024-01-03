import React from 'react'
import { styled } from '@mui/material/styles'
const PREFIX = 'More'

const classes = {
  root: `${PREFIX}-root`,
  text: `${PREFIX}-text`,
  h1: `${PREFIX}-h1`,
  p: `${PREFIX}-p`
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(5)}`,
    // color: '#616161',
    fontSize: 14,
    [theme.breakpoints.down(400)]: {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  [`& .${classes.text}`]: {
    alignContent: 'center',
    textAlign: 'left'
  },
  [`& .${classes.h1}`]: {
    fontWeight: 300
  },
  [`& .${classes.p}`]: {
    maxWidth: 450
  }
}))

function More() {
  return (
    <Root className={classes.root}>
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
    </Root>
  )
}

export default More
