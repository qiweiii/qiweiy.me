import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Auth } from 'aws-amplify'
import GoogleButton from './GoogleButton'
import Fab from '@mui/material/Fab'
import CircularProgress from '@mui/material/CircularProgress'
import { userAuthSuccess } from '../actions'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PREFIX = 'Login'

const classes = {
  main: `${PREFIX}-main`,
  paper: `${PREFIX}-paper`,
  avatars: `${PREFIX}-avatars`,
  google: `${PREFIX}-google`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
  p: `${PREFIX}-p`
}

const Root = styled('main')(({ theme }) => ({
  [`&.${classes.main}`]: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  [`& .${classes.paper}`]: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(3)}`
  },
  [`& .${classes.avatars}`]: {
    display: 'flex',
    flexGrow: 1
  },
  [`& .${classes.google}`]: {
    margin: theme.spacing(1),
    backgroundColor: '#db3236'
  },
  [`& .${classes.form}`]: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  [`& .${classes.submit}`]: {
    marginTop: theme.spacing(3)
  },
  [`& .${classes.p}`]: {
    paddingTop: 5,
    fontSize: 14
    // color: "#424242",
  }
}))

const Login = (props) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    isLoading: false
  })

  const navigate = useNavigate()

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.id]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setState({ ...state, isLoading: true })
    try {
      await Auth.signIn(state.email, state.password)
      props.userAuthSuccess()
      setState({ ...state, isLoading: false })
      navigate('/')
    } catch (e) {
      alert(e.message)
      setState({ ...state, isLoading: false })
    }
  }

  const handleGgLogin = () => {
    props.userAuthSuccess()
  }
  return (
    <Root className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <div className={classes.avatars}>
          <Fab size="small" className={classes.google}>
            <GoogleButton onLogin={handleGgLogin} />
          </Fab>
        </div>
        <Typography component="p" className={classes.p}>
          Or Be Classic
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl value={state.email} onChange={handleChange} margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl value={state.password} onChange={handleChange} margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={state.isLoading}
          >
            Login{' '}
            {state.isLoading && (
              <span style={{ paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
                <CircularProgress size="1.1em" />
              </span>
            )}
          </Button>
        </form>
      </Paper>
    </Root>
  )
}

export default connect(null, { userAuthSuccess })(Login)
