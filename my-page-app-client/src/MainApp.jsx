import React, { Fragment, useEffect, useState, useCallback, useContext } from 'react'
import clsx from 'clsx'
import { useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import LaunchIcon from '@mui/icons-material/Launch'
import Github from 'mdi-material-ui/Github'
import NoteMultiple from 'mdi-material-ui/NoteMultiple'
import Lightbulb from 'mdi-material-ui/Lightbulb'
import Linkedin from 'mdi-material-ui/Linkedin'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'
import Main from './Main'
import { Auth } from 'aws-amplify'
import Tooltip from '@mui/material/Tooltip'
import { Helmet } from 'react-helmet'
import { userAuthSuccess, userLogout } from './actions'
import { connect } from 'react-redux'
import { ColorModeContext } from './App'

const drawerWidth = 220

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  menuButton: {
    marginRight: theme.spacing(2.5)
  },
  toolbar: {
    // as a placeholder for layout
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(7)} + 1px)`
    }
  },
  content: {
    width: `calc(100vw - calc(${theme.spacing(7)} + 1px))`,
    flexGrow: 1
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[2],
    fontSize: 12
  }
}))

const MainApp = (props) => {
  const [open, setOpen] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const theme = useTheme()
  const classes = useStyles()
  const colorMode = useContext(ColorModeContext)
  let navigate = useNavigate()

  const authUser = useCallback(async () => {
    await Auth.currentAuthenticatedUser()
    props.userAuthSuccess()
  }, [])

  useEffect(() => {
    // refactor async calls: https://devtrium.com/posts/async-functions-useeffect
    authUser()
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setIsAuthenticating(false)
      })
  }, [authUser])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleToggleDrawer = () => {
    if (open) {
      handleDrawerClose()
    } else {
      handleDrawerOpen()
    }
  }

  const handleLogout = async () => {
    await Auth.signOut()
    props.userLogout()
    navigate('/login')
  }

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleToggleDrawer} size="large">
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List sx={{ paddingTop: 0 }}>
        <ListItem component={RouterLink} to="/" button key="Home" onClick={handleDrawerClose}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <Tooltip title="Blogs" placement="right" classes={{ tooltip: classes.tooltip }}>
          <ListItem component={RouterLink} to="/blogs" button key="Blogs" onClick={handleDrawerClose}>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Blogs" />
          </ListItem>
        </Tooltip>
        <Tooltip title="Github profile" placement="right" classes={{ tooltip: classes.tooltip }}>
          <ListItem
            component="a"
            target="_blank"
            href="https://github.com/qiweiii"
            button
            key="GitHub"
            onClick={handleDrawerClose}
          >
            <ListItemIcon>
              <Github />
            </ListItemIcon>
            <ListItemText
              primary={
                <div>
                  GitHub <LaunchIcon style={{ fontSize: 16 }} />
                </div>
              }
            />
          </ListItem>
        </Tooltip>
        <Tooltip title="LinkedIn profile" placement="right" classes={{ tooltip: classes.tooltip }}>
          <ListItem
            component="a"
            target="_blank"
            href="https://linkedin.com/in/qiwei-yang-679617142/"
            button
            key="Linkedin"
            onClick={handleDrawerClose}
          >
            <ListItemIcon>
              <Linkedin />
            </ListItemIcon>
            <ListItemText
              primary={
                <div>
                  LinkedIn <LaunchIcon style={{ fontSize: 16 }} />
                </div>
              }
            />
          </ListItem>
        </Tooltip>
        <Tooltip title="Learning" placement="right" classes={{ tooltip: classes.tooltip }}>
          <ListItem
            component="a"
            target="_blank"
            href="https://www.notion.so/qiweiiii/e14c3b22d12c4ffbba8b22b2bfeccc6f"
            button
            key="Learning"
            onClick={handleDrawerClose}
          >
            <ListItemIcon>
              <NoteMultiple fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <div>
                  Learning <LaunchIcon style={{ fontSize: 16 }} />
                </div>
              }
            />
          </ListItem>
        </Tooltip>
      </List>
      <Divider />
      <ListItem component={RouterLink} to="/more" button key="More" onClick={handleDrawerClose}>
        <ListItemIcon>
          <Lightbulb />
        </ListItemIcon>
        <ListItemText primary="More" />
      </ListItem>
    </div>
  )

  return (
    !isAuthenticating && (
      <div className={classes.root}>
        <Helmet>
          <title>Qiwei Yang</title>
          <meta property="og:title" content="Qiwei Yang's website" />
          <meta property="og:type" content="website" />
          <meta name="description" content="Qiwei Yang's website. 杨启维 个人网站" />
        </Helmet>
        <CssBaseline />

        <Drawer
          variant="permanent"
          anchor="left"
          open={open}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
        >
          {drawer}
        </Drawer>

        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
          enableColorOnDark
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.grow}>
              <Link color="inherit" underline="hover" component={RouterLink} to="/">
                QIWEI
              </Link>
            </Typography>

            {props.userHasAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Fragment>
                <Button component={RouterLink} to="/signup" color="inherit">
                  Signup
                </Button>
                <Button component={RouterLink} to="/login" color="inherit">
                  Login
                </Button>
              </Fragment>
            )}

            <Tooltip title="Toggle dark/light mode" placement="bottom" classes={{ tooltip: classes.tooltip }}>
              <IconButton onClick={colorMode.toggleColorMode} size="large">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Main />
        </main>
      </div>
    )
  )
}

const mapStateToProps = (state) => {
  return {
    userHasAuthenticated: state.userHasAuthenticated
  }
}

export default connect(mapStateToProps, { userAuthSuccess, userLogout })(MainApp)
