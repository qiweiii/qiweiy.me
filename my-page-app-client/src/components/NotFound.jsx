import React from 'react'
import { styled } from '@mui/material/styles'
const PREFIX = 'NotFound'

const classes = {
  root: `${PREFIX}-root`
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    marginTop: theme.spacing(20),
    alignItems: 'center',
    alignContent: 'center',
    padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(5)}`,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 200,
    color: '#999'
  }
}))

function NotFound() {
  return (
    <Root className={classes.root}>
      <h3>Sorry, page not found</h3>
    </Root>
  )
}

export default NotFound
