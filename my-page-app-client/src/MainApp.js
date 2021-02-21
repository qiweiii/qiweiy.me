import React, {Fragment} from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
// import Hidden from '@material-ui/core/Hidden';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import LaunchIcon from '@material-ui/icons/Launch';
import Github from 'mdi-material-ui/Github'
import Lightbulb from 'mdi-material-ui/Lightbulb'
import Linkedin from 'mdi-material-ui/Linkedin'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import Main from "./Main";
import { Auth } from "aws-amplify";
import Tooltip from '@material-ui/core/Tooltip';
import config from "./config";
import { Helmet } from "react-helmet";
import { userAuthSuccess, userLogout } from "./actions"
import { connect } from 'react-redux';


const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  drawerHeader: {
    fontSize: 12,
    display: 'flex',
    // padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    paddingRight: 20, // keep right padding when drawer closed
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    width: '100vw',
    flexGrow: 1,
    // padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[2],
    fontSize: 12,
  },
});



class MainApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticating: true,
      open: false
    };
  }

  async componentDidMount() {
    this.loadFacebookSDK();
    try {
      await Auth.currentAuthenticatedUser();
      this.props.userAuthSuccess();
    } catch (e) {
      if (e !== "not authenticated") {
        console.log(e);
      }
    }
    this.setState({ isAuthenticating: false });
  }

  loadFacebookSDK() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId            : config.social.FB,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v3.1'
      });
    };
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.props.userLogout();
    this.props.history.push("/login");
  }

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <Helmet>
          <title>Qiwei Yang</title>
          <meta property="og:title" content="Qiwei Yang's website" />
          <meta property="og:type" content="website" />
          <meta name="description" content="Qiwei Yang's website. 杨启维 个人网站" />
        </Helmet>
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem component={RouterLink} to="/" button key='Home'>
            <ListItemIcon ><HomeIcon/></ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          <ListItem component={RouterLink} to="/blogs" button key='Blogs'>
            <ListItemIcon><BookmarkIcon /></ListItemIcon>
            <ListItemText primary='Blogs' />
          </ListItem>
          <Tooltip title="Github profile" placement="right" classes={{ tooltip: classes.tooltip }}>
            <ListItem component="a" target="_blank" href="https://github.com/qiweiii" button key='GitHub'>
              <ListItemIcon><Github /></ListItemIcon>
              <ListItemText primary={<div>GitHub <LaunchIcon style={{ fontSize: 16 }} /></div>} />
            </ListItem>
          </Tooltip>
          <Tooltip title="LinkedIn profile" placement="right" classes={{ tooltip: classes.tooltip }}>
            <ListItem component="a" target="_blank" href="https://linkedin.com/in/qiwei-yang-679617142/" button key='Linkedin'>
              <ListItemIcon><Linkedin /></ListItemIcon>
              <ListItemText primary={<div>LinkedIn <LaunchIcon style={{ fontSize: 16 }} /></div>} />
            </ListItem>
          </Tooltip>
        </List>
        <Divider />
        <ListItem component={RouterLink} to="/more" button key='More'>
          <ListItemIcon><Lightbulb /></ListItemIcon>
          <ListItemText primary='More' />
        </ListItem>
      </div>
    );

    return (
      !this.state.isAuthenticating &&
      <div className={classes.root}>
        <CssBaseline />

        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.grow} >
              <Link color="inherit" component={RouterLink} to="/">
                  QIWEI
              </Link>
            </Typography>
            <Tooltip title="Toggle dark/light mode" placement="bottom" classes={{ tooltip: classes.tooltip }}>
              <IconButton onClick={this.props.onToggleDark}>
                {this.props.isDark ? 
                  <Brightness7Icon /> : <Brightness4Icon style={{ color: 'white' }} /> 
                }
              </IconButton>
            </Tooltip>
            {this.props.userHasAuthenticated 
              ? <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
              : <Fragment>
                  <Button component={RouterLink} to="/signup" color="inherit">Signup</Button>
                  <Button component={RouterLink} to="/login"  color="inherit">Login</Button>
                </Fragment>
            }
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>

        <main 
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open,
          })}
        >
          <div className={classes.toolbar} />
          <Main />
        </main>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    userHasAuthenticated: state.userHasAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { userAuthSuccess, userLogout }
)(withRouter(withStyles(styles, { withTheme: true })(MainApp)));