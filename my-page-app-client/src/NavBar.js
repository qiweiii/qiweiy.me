import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
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
import GithubFace from 'mdi-material-ui/GithubFace'
import Lightbulb from 'mdi-material-ui/Lightbulb'
import Linkedin from 'mdi-material-ui/Linkedin'
// import Youtube from 'mdi-material-ui/Youtube'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import MainHOC from "./MainHOC";
import { Auth } from "aws-amplify";
import Tooltip from '@material-ui/core/Tooltip';
import config from "./config";

const drawerWidth = 180;

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    // color: '#fff',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerHeader: {
    fontSize: 12,
    display: 'flex',
    alignItems: 'flex',
    padding: '34px 15px 6px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginLeft: 5,
    marginRight: 10,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
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
    flexGrow: 1,
    width: "82%",
    // marginLeft: theme.spacing(1),
    padding: theme.spacing(1),
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[2],
    fontSize: 12,
  },
});




class NavBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false,
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    this.loadFacebookSDK();
    try {
      await Auth.currentAuthenticatedUser();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== "not authenticated") {
        alert(e);
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

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }



  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
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
          {/* <Tooltip title="Latest resume" placement="right" classes={{ tooltip: classes.tooltip }}>
            <ListItem component={RouterLink} to="/resume" button key='Resume'>
              <ListItemIcon><FileDocumentBox /></ListItemIcon>
              <ListItemText primary='Resume' />
            </ListItem>
          </Tooltip> */}
          <Tooltip title="My Github profile" placement="right" classes={{ tooltip: classes.tooltip }}>
            <ListItem component="a" target="_blank" href="https://github.com/qiweiii" button key='GitHub'>
              <ListItemIcon><GithubFace /></ListItemIcon>
              <ListItemText primary={<div>GitHub <LaunchIcon style={{ fontSize: 16 }} /></div>} />
            </ListItem>
          </Tooltip>
          <Tooltip title="My LinkedIn profile" placement="right" classes={{ tooltip: classes.tooltip }}>
            <ListItem component="a" target="_blank" href="https://linkedin.com/in/qiwei-yang-679617142" button key='Linkedin'>
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
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.grow} >
              <Link color="inherit" component={RouterLink} to="/">
                  QW
              </Link>
            </Typography>
            <Tooltip title="Toggle dark/light mode" placement="bottom" classes={{ tooltip: classes.tooltip }}>
              <IconButton onClick={this.props.onToggleDark}>
                {this.props.isDark ? 
                  <Brightness7Icon /> : <Brightness4Icon style={{ color: 'white' }} /> 
                }
              </IconButton>
            </Tooltip>
            {this.state.isAuthenticated 
              ? <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
              : <Fragment>
                  <Button component={RouterLink} to="/signup" color="inherit">Signup</Button>
                  <Button component={RouterLink} to="/login"  color="inherit">Login</Button>
                </Fragment>
            }
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <MainHOC childProps={childProps} />
        </main>

      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(NavBar));