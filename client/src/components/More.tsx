import { styled } from '@mui/material/styles'

const PREFIX = 'More'

const classes = {
  root: `${PREFIX}-root`,
  text: `${PREFIX}-text`,
  h1: `${PREFIX}-h1`,
  li: `${PREFIX}-li`,
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
    },
    ul: {
      paddingInlineStart: 20
    }
  },
  [`& .${classes.text}`]: {
    alignContent: 'center',
    textAlign: 'left'
  },
  [`& .${classes.li}`]: {
    fontWeight: 300
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
        <ul>
          <li className={classes.li}>Building interesting profitable fullstack projects.</li>
          <li className={classes.li}>Working on Ethereum & Polkadot ecosystem.</li>
          <li className={classes.li}>Crypto quant trading.</li>
          <li className={classes.li}>More blogs.</li>
        </ul>
        <br />
        <p className={classes.p}>
          My email: <a href="mailto: yangqiwei97@gmail.com">yangqiwei97@gmail.com</a>
        </p>
      </div>
    </Root>
  )
}

export default More
