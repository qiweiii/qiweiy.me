import React, { useEffect, useState, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import Disqus from 'disqus-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import HeadingRenderer from './HeadingRenderer'
import './BlogView.css'
import { Helmet } from 'react-helmet'
import tocbot from 'tocbot'
import { get } from 'aws-amplify/api'
import CircularProgress from '@mui/material/CircularProgress'
import { connect } from 'react-redux'

const PREFIX = 'BlogView'

const classes = {
  layout: `${PREFIX}-layout`,
  title: `${PREFIX}-title`,
  author: `${PREFIX}-author`,
  content: `${PREFIX}-content`,
  buttons: `${PREFIX}-buttons`,
  button: `${PREFIX}-button`,
  spinner: `${PREFIX}-spinner`
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.layout}`]: {
    width: 'auto',
    maxWidth: 880,
    margin: '3% 22% 3%',
    [theme.breakpoints.down(1300)]: {
      margin: '3% 23% 3% 15%'
    },
    [theme.breakpoints.down(1100)]: {
      margin: '3% 10% 3% 8%'
    },
    [theme.breakpoints.down(720)]: {
      margin: 'auto'
    },
    padding: '0px 8px'
  },

  [`& .${classes.title}`]: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    padding: theme.spacing(3)
  },

  [`& .${classes.author}`]: {
    fontSize: 14,
    color: 'silver',
    padding: theme.spacing(1)
  },

  [`& .${classes.content}`]: {
    minHeight: 400,
    maxWidth: 880,
    fontSize: '1.15rem',
    lineHeight: '1.8',
    padding: theme.spacing(1)
  },

  [`& .${classes.buttons}`]: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  [`& .${classes.button}`]: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(3)
  },

  [`& .${classes.spinner}`]: {
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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

  const location = useLocation()
  const navigate = useNavigate()

  const getBlogData = useCallback(async () => {
    // maybe should do string compression and decompression
    const id = location.pathname.split('-').slice(-5).join('-')
    const res = await get({ apiName: 'notes', path: `/notes/${id}` }).response
    const blog = await res?.body?.json()
    setState({
      ...state,
      editedAt: new Date(blog.editedAt).toLocaleDateString('en-US', { hour12: false }),
      createdAt: new Date(blog.createdAt).toLocaleDateString('en-US', { hour12: false }),
      content: blog.content?.content,
      author: blog.content?.author,
      title: blog.content?.title,
      imageUrl: blog.content?.image,
      tags: blog.content?.tags,
      id: blog.noteId,
      contentReady: true
    })
  }, [])

  useEffect(() => {
    getBlogData()
      .then(() => {
        // add a timeout here because some times tocbot runs before
        // the markdown html is ready
        setTimeout(() => {
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
        }, 200)
      })
      .catch((error) => {
        console.error('[BlogView]' + error instanceof Error ? error.message : String(error))
        navigate('/blogs')
      })
  }, [])

  return (
    <Root>
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
              <meta name="description" content={state.title} />
            </Helmet>
            <Typography variant="h4" gutterBottom align="center" className={classes.title}>
              {state.title}
            </Typography>
            <Typography gutterBottom align="left" className={classes.author}>
              Created by {state.author} on {state.createdAt} | Edited on {state.editedAt}
            </Typography>

            <div className={classes.content}>
              <ReactMarkdown
                className="markdown"
                linkTarget="_blank"
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                skipHtml={false}
                // https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
                components={{
                  code: ({ inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      // lucario and nightOwl are the best:
                      // https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
                      <SyntaxHighlighter style={nightOwl} language={match[1]} PreTag="div" {...props}>
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                  h1: HeadingRenderer,
                  h2: HeadingRenderer,
                  h3: HeadingRenderer
                }}
              >
                {state.content}
              </ReactMarkdown>
            </div>
            {!props.userHasAuthenticated ? (
              <div className={classes.buttons}></div>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                component={RouterLink}
                to={{ pathname: `/blogs/edit/${state.id}` }}
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
    </Root>
  )
}

const mapStateToProps = (state) => {
  return {
    userHasAuthenticated: state.userHasAuthenticated
  }
}

export default connect(mapStateToProps, null)(BlogView)
