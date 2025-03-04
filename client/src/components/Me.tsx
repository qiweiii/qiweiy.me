import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import qiwei from '../img/5bc2e7.png'

import './Me.css'

const PREFIX = 'Home'

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  avatar: `${PREFIX}-avatar`,
  name: `${PREFIX}-name`,
  p: `${PREFIX}-p`,
  p1: `${PREFIX}-p1`,
  p2: `${PREFIX}-p2`
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    height: `calc(100vh - 64px)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing(2)} 10% ${theme.spacing(5)}`,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  [`& .${classes.paper}`]: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
      margin: '5%'
    }
  },
  [`& .${classes.avatar}`]: {
    margin: 20,
    width: 80,
    height: 80,
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      margin: 10
    }
  },
  [`& .${classes.name}`]: {
    padding: theme.spacing(3),
    fontWeight: 300,
    fontSize: '2rem',
    lineHeight: 2,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1)
    }
  },
  [`& .${classes.p}`]: {
    maxWidth: 460,
    fontSize: '1.1rem',
    fontWeight: 300,
    lineHeight: 1.7,
    letterSpacing: 0.1,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1)
    }
  },
  [`& .${classes.p1}`]: {
    maxWidth: 460,
    fontSize: '1.1rem',
    fontWeight: 300,
    lineHeight: 1.7,
    letterSpacing: 0.1,
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 1)
    }
  },
  [`& .${classes.p2}`]: {
    maxWidth: 480,
    fontSize: '1.1rem',
    fontWeight: 300,
    lineHeight: 1.7,
    letterSpacing: 0.1,
    padding: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0)
    }
  }
}))

function Home() {
  return (
    <Root>
      <div className={classes.root + ' spring'}>
        <Paper color="default" elevation={2} className={classes.paper}>
          <Grid container justifyContent="center" alignItems="center">
            <Avatar alt="Qiwei Y" src={qiwei} className={classes.avatar} />
            <Typography variant="h4" className={classes.name}>
              Qiwei Yang
            </Typography>
          </Grid>
          <Typography gutterBottom variant="body1" className={classes.p}>
            Full-stack engineer working from home, with an interest in{' '}
            <Typography variant="body1" fontStyle="italic" display="inline">
              web, cloud and blockchain
            </Typography>
            .
          </Typography>
          <Typography gutterBottom variant="body1" className={classes.p1}>
            Building{' '}
            <a target="_blank" href="https://graypaper.com/" rel="noreferrer">
              JAM
            </a>{' '}
            and {/* <a target="_blank" href="https://qw" rel="noreferrer">  */}
            qw.build (WIP)
            {/* </a> */}
          </Typography>
          <Typography gutterBottom variant="body1" className={classes.p2}>
            Worked at
            <span>
              {' '}
              <a target="_blank" href="https://github.com/AcalaNetwork" rel="noreferrer">
                Acala
              </a>
              ,{' '}
            </span>
            <span>
              {' '}
              <a target="_blank" href="https://www.crimsoneducation.org" rel="noreferrer">
                Crimson
              </a>
              ,{' '}
            </span>
            <span>
              {' '}
              <a target="_blank" href="https://www.sap.com" rel="noreferrer">
                SAP
              </a>
              ,{' '}
            </span>
            <span>
              {' '}
              <a target="_blank" href="https://www.huawei.com" rel="noreferrer">
                Huawei
              </a>
            </span>
            .
          </Typography>
          <Typography gutterBottom variant="body1" className={classes.p2}>
            Computer Science grad (2021) from{' '}
            <a target="_blank" href="https://www.unsw.edu.au/about-us" rel="noreferrer">
              UNSW
            </a>
            .
          </Typography>
          <Typography gutterBottom variant="body1" className={classes.p2}>
            Email: <a href="mailto: yangqiwei97@gmail.com">yangqiwei97@gmail.com</a>.
          </Typography>
        </Paper>
      </div>
    </Root>
  )
}

export default Home
