import React from 'react'
import withStyles from '@mui/styles/withStyles'
import { Typography } from '@mui/material'
import qiwei from '../img/zima.jpg'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import './Home.css'

const styles = (theme) => ({
  root: {
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(5)}`,
    textAlign: 'center',
    [theme.breakpoints.up(400)]: {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    minHeight: 350,
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3)
    }
  },
  avatar: {
    margin: 20,
    width: 80,
    height: 80,
    marginTop: theme.spacing(3)
  },
  name: {
    padding: theme.spacing(3),
    fontWeight: 300,
    fontSize: '2rem',
    lineHeight: 2
  },
  p: {
    maxWidth: 460,
    fontSize: '1.1rem',
    fontWeight: 300,
    lineHeight: 1.7,
    letterSpacing: 0.1,
    padding: theme.spacing(2)
  }
})

function Home(props) {
  const { classes } = props

  return (
    <div className={classes.root + ' spring'}>
      <Paper color="default" elevation={2} className={classes.paper}>
        <Grid container justifyContent="center" alignItems="center">
          <Avatar alt="Qiwei Y" src={qiwei} className={classes.avatar} />
          <Typography variant="h4" className={classes.name}>
            Qiwei Yang
          </Typography>
        </Grid>
        <Typography gutterBottom variant="body1" className={classes.p}>
          Fullstack engineer working from home, with an interest in web, cloud and blockchain.{' '}
        </Typography>
        <Typography gutterBottom variant="body1" className={classes.p}>
          Worked at
          <span>
            {' '}
            <a target="_blank" href="https://www.nervos.org" rel="noreferrer">
              Nervos
            </a>
            ,{' '}
          </span>
          <span>
            {' '}
            <a target="_blank" href="https://www.crimsoneducation.org" rel="noreferrer">
              Crimson Education
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
          and
          <span>
            {' '}
            <a target="_blank" href="https://www.huawei.com" rel="noreferrer">
              Huawei
            </a>
          </span>
          .
        </Typography>
        <Typography gutterBottom variant="body1" className={classes.p}>
          Computer Science graduate (2021) from{' '}
          <a target="_blank" href="https://www.unsw.edu.au/" rel="noreferrer">
            UNSW Sydney
          </a>
          .
        </Typography>
        <Typography gutterBottom variant="body1" className={classes.p}>
          My email: <a href="mailto: yangqiwei97@gmail.com">yangqiwei97@gmail.com</a>.
        </Typography>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(Home)
