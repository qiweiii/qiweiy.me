import { SignUpOutput, confirmSignUp, signIn, signUp } from 'aws-amplify/auth'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import CssBaseline from '@mui/material/CssBaseline'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Paper from '@mui/material/Paper'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'

import { useAppData } from 'src/hooks/appData'

const PREFIX = 'Signup'

const classes = {
  main: `${PREFIX}-main`,
  paper: `${PREFIX}-paper`,
  avatars: `${PREFIX}-avatars`,
  lock: `${PREFIX}-lock`,
  google: `${PREFIX}-google`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
  p: `${PREFIX}-p`
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.main}`]: {
    width: 'auto',
    display: 'block',
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
  [`& .${classes.lock}`]: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
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
  }
}))

const Signup = () => {
  const { setUserHasAuthenticated } = useAppData()
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
    newUser: {} as SignUpOutput
  })
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    return data.email.length > 0 && data.password.length > 0 && data.password === data.confirmPassword
  }

  const validateConfirmationForm = () => {
    return data.confirmationCode.length > 0
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.id]: event.target.value
    })
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const newUser = await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email
          }
        }
      })
      setData({
        ...data,
        newUser
      })
    } catch (e) {
      alert(e instanceof Error ? e.message : String(e))
    }
    setIsLoading(false)
  }

  const handleConfirmationSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      await confirmSignUp({ username: data.email, confirmationCode: data.confirmationCode })
      await signIn({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email
          }
        }
      })

      setUserHasAuthenticated(true)
      navigate('/')
    } catch (e) {
      alert(e instanceof Error ? e.message : String(e))
      setIsLoading(false)
    }
  }

  const renderConfirmationForm = () => {
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.lock}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Confirmation Code
          </Typography>
          <form onSubmit={handleConfirmationSubmit} className={classes.form}>
            <FormControl onChange={handleChange} margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Code</InputLabel>
              <Input name="confirmationCode" type="password" id="confirmationCode" value={data.confirmationCode} />
            </FormControl>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!validateConfirmationForm() || isLoading}
            >
              Send{' '}
              {isLoading && (
                <span style={{ paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size="1.1em" />
                </span>
              )}
            </Button>
          </form>
        </Paper>
      </main>
    )
  }

  const renderForm = () => {
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <FormControl onChange={handleChange} margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus value={data.email} />
            </FormControl>

            <FormControl onChange={handleChange} margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data.password}
              />
            </FormControl>

            <FormControl onChange={handleChange} margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={data.confirmPassword}
              />
            </FormControl>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!validateForm() || isLoading}
            >
              Signup{' '}
              {isLoading && (
                <span style={{ paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size="1.1em" />
                </span>
              )}
            </Button>
          </form>
        </Paper>
      </main>
    )
  }

  return <Root className="Signup">{data.newUser === null ? renderForm() : renderConfirmationForm()}</Root>
}

export default Signup
