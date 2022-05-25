import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Input from '@mui/material/Input'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import InputLabel from '@mui/material/InputLabel'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Auth } from 'aws-amplify'
import CircularProgress from '@mui/material/CircularProgress'
import makeStyles from '@mui/styles/makeStyles'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  main: {
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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(3)}`
  },
  avatars: {
    display: 'flex',
    flexGrow: 1
  },
  lock: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  google: {
    margin: theme.spacing(1),
    backgroundColor: '#db3236'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(3)
  },
  p: {
    paddingTop: 5,
    fontSize: 14
  }
}))

const Signup = (props) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
    newUser: null
  })
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    return data.email.length > 0 && data.password.length > 0 && data.password === data.confirmPassword
  }

  const validateConfirmationForm = () => {
    return data.confirmationCode.length > 0
  }

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.id]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const newUser = await Auth.signUp({
        username: data.email,
        password: data.password
      })
      setData({
        ...data,
        newUser
      })
    } catch (e) {
      alert(e.message)
    }
    setIsLoading(false)
  }

  const handleConfirmationSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      await Auth.confirmSignUp(data.email, data.confirmationCode)
      await Auth.signIn(data.email, data.password)

      props.userAuthSuccess()
      navigate('/')
    } catch (e) {
      alert(e.message)
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
            <FormControl value={data.confirmationCode} onChange={handleChange} margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Code</InputLabel>
              <Input name="confirmationCode" type="password" id="confirmationCode" />
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
            <FormControl value={data.email} onChange={handleChange} margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>

            <FormControl value={data.password} onChange={handleChange} margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>

            <FormControl value={data.confirmPassword} onChange={handleChange} margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input name="confirmPassword" type="password" id="confirmPassword" autoComplete="current-password" />
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

  return <div className="Signup">{data.newUser === null ? renderForm() : renderConfirmationForm()}</div>
}

export default Signup
