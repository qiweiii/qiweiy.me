import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import GithubFace from 'mdi-material-ui/GithubFace'
import Lightbulb from 'mdi-material-ui/Lightbulb'
import Linkedin from 'mdi-material-ui/Linkedin'
import FileDocumentBox from 'mdi-material-ui/FileDocumentBox'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import Routes from "./Routes";

const drawerWidth = 180;

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
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
    marginLeft: 10,
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  //loginButton: {
  //  marginRight: 0,
  //},
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
    padding: theme.spacing.unit * 3,
  },
});

class NavBar extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <Link href="https://qiweiii.herokuapp.com/" color='#9e9e9e'>v1.0</Link>
        </div>
        <Divider />
        <List>
            <ListItem component={RouterLink} to="/" button key='Home'>
              <ListItemIcon ><HomeIcon/></ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
            <ListItem component={RouterLink} to="/" button key='Blogs'>
              <ListItemIcon><BookmarkIcon /></ListItemIcon>
              <ListItemText primary='Blogs' />
            </ListItem>
            <ListItem component={RouterLink} to="/" button key='Resume'>
              <ListItemIcon><FileDocumentBox /></ListItemIcon>
              <ListItemText primary='Resume' />
            </ListItem>
            <ListItem component="a" href="https://github.com/qiweiii/my-website-v2" button key='GitHub'>
              <ListItemIcon><GithubFace /></ListItemIcon>
              <ListItemText primary='GitHub' />
            </ListItem>
            <ListItem component="a" href="https://linkedin.com/in/qiwei-yang-679617142" button key='Linkedin'>
              <ListItemIcon><Linkedin /></ListItemIcon>
              <ListItemText primary='LinkedIn' />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem component={RouterLink} to="/" button key='More'>
              <ListItemIcon><Lightbulb /></ListItemIcon>
              <ListItemText primary='More' />
            </ListItem>
          </List>
      </div>
    );

    return (
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
            <Link className={classes.grow} variant="h6" color="inherit" component={RouterLink} to="/">
                QW
            </Link>
            <Button component={RouterLink} to="/signup" color="inherit">Signup</Button>
            <Button component={RouterLink} to="/login"className={classes.loginButton} color="inherit">Login</Button>
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
          {/* i should move this out... */}
          <Routes/>
        </main>

      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NavBar);




