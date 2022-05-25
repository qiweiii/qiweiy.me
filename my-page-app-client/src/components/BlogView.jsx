import React, { useEffect, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import Disqus from 'disqus-react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock.jsx'
import './BlogView.css'
import classNames from 'classnames'
import { Helmet } from 'react-helmet'
import HeadingRenderer from './HeadingRenderer'
import tocbot from 'tocbot'
import { API } from 'aws-amplify'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    maxWidth: 880,
    margin: 'auto',
    [theme.breakpoints.down(1600)]: {
      margin: '3% 23% 3% 15%'
    },
    [theme.breakpoints.down(1280 + theme.spacing(3 * 2))]: {
      margin: '3% 23% 3% 15%'
    },
    [theme.breakpoints.down(1100)]: {
      margin: '3% 12%'
    },
    [theme.breakpoints.down(600 + theme.spacing(3))]: {
      margin: 'auto'
    },
    padding: '0px 10px'
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    padding: theme.spacing(3)
  },
  author: {
    fontSize: 14,
    color: 'silver',
    [theme.breakpoints.up(600 + theme.spacing(3 * 2))]: {
      padding: theme.spacing(1)
    }
  },
  content: {
    minHeight: 400,
    maxWidth: 880,
    fontSize: '1.15rem',
    lineHeight: '1.8',
    padding: theme.spacing(1)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '150px'
  }
}))

const BlogView = (props) => {
  const [state, setState] = useState({
    editedAt: '',
    createdAt: '',
    content: '',
    author: '',
    title: '',
    imageUrl: '',
    tags: '',
    id: '',
    contentReady: false
  })
  const disqusShortname = 'qiweiy'
  const classes = useStyles()
  const location = useLocation()
  const navigate = useNavigate()

  const getBlogData = useCallback(async () => {
    // maybe should do string compression and decompression
    const id = location.pathname.split('-').slice(-5).join('-')
    const res = await API.get('pages', `/pages/${id}`)
    // console.log(res);
    setState({
      ...state,
      editedAt: new Date(res.editedAt).toLocaleDateString('en-US', { hour12: false }),
      createdAt: new Date(res.createdAt).toLocaleDateString('en-US', { hour12: false }),
      content: res.content.content,
      author: res.content.author,
      title: res.content.title,
      imageUrl: res.content.image,
      tags: res.content.tags,
      id: res.noteId,
      contentReady: true
    })
  }, [])

  useEffect(() => {
    getBlogData()
      .then(() => {
        tocbot.init({
          // Where to render the table of contents.
          tocSelector: '.js-toc',
          // Where to grab the headings to build the table of contents.
          contentSelector: '.markdown',
          // Which headings to grab inside of the contentSelector element.
          headingSelector: 'h1, h2, h3',
          collapseDepth: 4,
          headingsOffset: 64,
          scrollSmoothOffset: -64
        })
      })
      .catch((e) => {
        console.log(e)
        alert('Blog does not exist.')
        navigate('/blogs')
      })
  }, [])

  return (
    <div>
      <div>
        <div className="js-toc"></div>
      </div>

      {state.contentReady ? (
        <Container className={classes.layout}>
          <div>
            <Helmet>
              <title>{`${state.title} - ${state.author}`}</title>
              <meta property="og:title" content={state.title} />
              <meta property="og:type" content="blog" />
              {/* <meta name="description" content={blog.content.slice(0,100)} /> */}
            </Helmet>
            <Typography variant="h4" gutterBottom align="center" className={classes.title}>
              {state.title}
            </Typography>
            <Typography gutterBottom align="left" className={classes.author}>
              Created by {state.author} on {state.createdAt} | Edited on {state.editedAt}
            </Typography>

            <div className={classNames(classes.contentText, classes.content)}>
              <ReactMarkdown
                className="markdown"
                source={state.content}
                renderers={{ code: CodeBlock, heading: HeadingRenderer }}
                escapeHtml={false}
              />
            </div>
            {!props.userHasAuthenticated ? (
              <div className={classes.buttons}></div>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                component={RouterLink}
                to={{
                  pathname: `/blogs/edit/${state.id}`
                  // state: {
                  //   title: state.title,
                  //   content: state.content,
                  //   author: state.author,
                  //   image: state.imageUrl,
                  //   tags: state.tags,
                  //   id: state.id
                  // }
                }}
              >
                Edit
              </Button>
            )}

            {/* Load Disqus */}
            <div>
              {/* <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig} /> */}
              <Disqus.DiscussionEmbed
                shortname={disqusShortname}
                config={{
                  url: `https://qiweiy.me/blogs/view/${location.pathname}`,
                  identifier: `/blogs/view/${location.pathname}`,
                  title: state.title
                }}
              />
            </div>
          </div>
        </Container>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userHasAuthenticated: state.userHasAuthenticated
  }
}

export default connect(mapStateToProps, null)(BlogView)
