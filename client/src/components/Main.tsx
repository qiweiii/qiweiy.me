import { Fragment, useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'
import { signOut } from 'aws-amplify/auth'
import { styled, useTheme } from '@mui/material/styles'
import { useQueryClient } from '@tanstack/react-query'
import AppBar from '@mui/material/AppBar'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Button from '@mui/material/Button'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Github from 'mdi-material-ui/Github'
import HomeIcon from '@mui/icons-material/Home'
import IconButton from '@mui/material/IconButton'
import LaunchIcon from '@mui/icons-material/Launch'
import Lightbulb from 'mdi-material-ui/Lightbulb'
import Link from '@mui/material/Link'
import Linkedin from 'mdi-material-ui/Linkedin'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { getAllBlogs, getUserBlogs } from 'src/hooks/blogs'
import { getAuthenticatedUser } from 'src/api/amplify'
import { useAppData } from 'src/hooks/appData'
import { useColorMode } from 'src/hooks/colorMode'
import Routes from 'src/route/Routes'

const drawerWidth = 220
const PREFIX = 'MainApp'

const classes = {
  root: `${PREFIX}-root`,
  grow: `${PREFIX}-grow`,
  drawerHeader: `${PREFIX}-drawerHeader`,
  appBar: `${PREFIX}-appBar`,
  appBarShift: `${PREFIX}-appBarShift`,
  hide: `${PREFIX}-hide`,
  drawer: `${PREFIX}-drawer`,
  menuButton: `${PREFIX}-menuButton`,
  toolbar: `${PREFIX}-toolbar`,
  drawerOpen: `${PREFIX}-drawerOpen`,
  drawerClose: `${PREFIX}-drawerClose`,
  content: `${PREFIX}-content`,
  tooltip: `${PREFIX}-tooltip`
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    display: 'flex'
  },
  [`& .${classes.grow}`]: {
    flexGrow: 1
  },
  [`& .${classes.drawerHeader}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  [`& .${classes.appBar}`]: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  [`& .${classes.appBarShift}`]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  [`& .${classes.hide}`]: {
    display: 'none'
  },
  [`& .${classes.drawer}`]: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2.5)
  },
  [`& .${classes.toolbar}`]: {
    // as a placeholder for layout
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  [`& .${classes.drawerOpen}`]: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  [`& .${classes.drawerClose}`]: {
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
  [`& .${classes.content}`]: {
    width: `calc(100vw - calc(${theme.spacing(7)} + 1px))`,
    flexGrow: 1
  },
  [`& .${classes.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[2],
    fontSize: 12
  }
}))

const Main = () => {
  const [open, setOpen] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const theme = useTheme()
  const { userHasAuthenticated, setUserHasAuthenticated } = useAppData()
  const queryClient = useQueryClient()
  const colorMode = useColorMode()
  let navigate = useNavigate()

  // https://tanstack.com/query/latest/docs/react/guides/prefetching
  const prefetchBlogs = async () => {
    // The results of this query will be cached like a normal query
    await queryClient.prefetchQuery({
      queryKey: ['blogs'],
      queryFn: getUserBlogs
    })
    await queryClient.prefetchQuery({
      queryKey: ['blogs', 'all'],
      queryFn: getAllBlogs
    })
  }

  useEffect(() => {
    prefetchBlogs()
  }, [])

  const authUser = useCallback(async () => {
    await getAuthenticatedUser()
    setUserHasAuthenticated(true)
  }, [])

  useEffect(() => {
    setIsAuthenticating(true)
    authUser()
      .catch((error) => {
        console.error('[Main] ' + `${error instanceof Error ? error.message : String(error)}`)
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
    await signOut()
    setUserHasAuthenticated(false)
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
        <ListItem component={RouterLink} to="/" button key="Me" onClick={handleDrawerClose}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Me" />
        </ListItem>
        <Tooltip title="Blogs" placement="right" classes={{ tooltip: classes.tooltip }}>
          <ListItem component={RouterLink} to="/blogs" button key="Blogs" onClick={handleDrawerClose}>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Blogs" />
          </ListItem>
        </Tooltip>
        <Tooltip
          title={
            <div>
              GitHub <LaunchIcon style={{ fontSize: 12 }} />
            </div>
          }
          placement="right"
          classes={{ tooltip: classes.tooltip }}
        >
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
        <Tooltip
          title={
            <div>
              LinkedIn <LaunchIcon style={{ fontSize: 12 }} />
            </div>
          }
          placement="right"
          classes={{ tooltip: classes.tooltip }}
        >
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
        {/* <Tooltip
          title={
            <div>
              Learning <LaunchIcon style={{ fontSize: 12 }} />
            </div>
          }
          placement="right"
          classes={{ tooltip: classes.tooltip }}
        >
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
        </Tooltip> */}
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
      <Root>
        <div className={classes.root}>
          <Helmet>
            <title>Qiwei Yang</title>
            <meta property="og:title" content="Qiwei Yang's website" />
            <meta property="og:type" content="website" />
            <meta name="description" content="Qiwei Yang's website. 杨启维个人网站" />
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

              {userHasAuthenticated ? (
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
                <IconButton onClick={colorMode.toggleMode} size="large">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>

          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Routes />
          </main>
        </div>
      </Root>
    )
  )
}

export default Main
