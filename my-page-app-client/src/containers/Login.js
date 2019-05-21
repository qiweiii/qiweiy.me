import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Auth } from "aws-amplify";
import FacebookButton from "../components/FacebookButton";
import GoogleButton from "../components/GoogleButton";
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatars: {
    display: 'flex',
    flexGrow: 1,
  },
  facebook: {
    margin: theme.spacing.unit,
    backgroundColor: '#fff',
  },
  google: {
    margin: theme.spacing.unit,
    backgroundColor: '#fff',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  p: {
    paddingTop: 5,
    font: 'Roboto',
    fontSize: 14,
    color: "#424242",
  }
});


class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);
    }
  }

  handleFbLogin = () => {
    this.props.userHasAuthenticated(true);
  }
  handleGgLogin = () => {
    this.props.userHasAuthenticated(true);
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <div className={classes.avatars}>
            <Fab size="small" className={classes.facebook}>
              <FacebookButton onLogin={this.handleFbLogin} />
            </Fab>
            <Fab size="small" className={classes.google}>
              <GoogleButton onLogin={this.handleGgLogin}/>
            </Fab>
          </div>
          <Typography component="p" className={classes.p} >
            Or Be Classical
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <FormControl value={this.state.email} onChange={this.handleChange} margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl value={this.state.password} onChange={this.handleChange} margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);