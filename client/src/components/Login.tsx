import { ChangeEvent, FormEventHandler, useState } from 'react'
import { signIn } from 'aws-amplify/auth'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import CssBaseline from '@mui/material/CssBaseline'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import * as appData from 'src/hooks/appData'

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

const Login = () => {
  const { setUserHasAuthenticated } = appData.useAppData()
  const [state, setState] = useState({
    email: '',
    password: '',
    isLoading: false
  })

  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.id]: event.target.value
    })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setState({ ...state, isLoading: true })
    try {
      await signIn({
        username: state.email,
        password: state.password,
        options: {
          userAttributes: {
            email: state.email
          }
        }
      })
      setUserHasAuthenticated(true)
      setState({ ...state, isLoading: false })
      navigate('/')
    } catch (e) {
      alert(e instanceof Error ? e.message : String(e))
      setState({ ...state, isLoading: false })
    }
  }

  return (
    <Root className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="p" className={classes.p}>
          Classic Login
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl onChange={handleChange} margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus value={state.email} />
          </FormControl>
          <FormControl onChange={handleChange} margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={state.password}
            />
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

export default Login
