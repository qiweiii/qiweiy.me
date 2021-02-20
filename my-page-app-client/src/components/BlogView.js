import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink} from 'react-router-dom'
import Disqus from 'disqus-react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from "./CodeBlock.js";
import "./BlogView.css";
import classNames from 'classnames';
import { Helmet } from "react-helmet";
import HeadingRenderer from './HeadingRenderer'
import * as tocbot from 'tocbot';
import { connect } from 'react-redux';
import { getBlogsById } from "../actions";
import { API } from "aws-amplify";
import CircularProgress from "@material-ui/core/CircularProgress";


const styles = theme => ({
  layout: {
    // marginLeft: 'auto',
    // marginRight: 'auto',
    width: 'auto',
    margin: '3% 22% 3% 22%',
    [theme.breakpoints.down(1280 + theme.spacing(3 * 2))]: {
      margin: '3% 18% 3% 18%',
    },
    [theme.breakpoints.down(960 + theme.spacing(3 * 2))]: {
      margin: '3% 10% 3% 10%',
    },
    [theme.breakpoints.down(600 + theme.spacing(3))]: {
      margin: 'auto',
    },
    padding: "0px 10px"
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    padding: theme.spacing(3),
  },
  author: {
    fontSize: 14,
    color: "silver",
    [theme.breakpoints.up(600 + theme.spacing(3 * 2))]: {
      padding: theme.spacing(1),
    },
  },
  content: {
    textAlign: 'left',
    minHeight: 400,
    [theme.breakpoints.up(600 + theme.spacing(3 * 2))]: {
      padding: theme.spacing(1),
      minHeight: 400,
    },
    fontSize: '1.15rem',
    lineHeight: '1.7',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
});


class BlogView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: "",
      contentReady: false,
    }
  }

  componentDidMount() {
    const res = await API.get("pages", `/pages/${this.props.location.state.id}`);
    console.log(res);
    this.setState({ 
      content: res[0].content,
      contentReady: true
    });
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: '.js-toc',
      // Where to grab the headings to build the table of contents.
      contentSelector: '.markdown',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h1, h2, h3',
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
    });
  }

  render() {
    const { classes } = this.props;
    const disqusShortname = 'qiweiy';
    const blog = this.props.location.state;
    const disqusConfig = {
        url: `https://qiweiy.me/blogs/view/${this.state.location.pathname}`,
        // identifier: `/blogs/view/${blog.id}`,
        identifier: `/blogs/view/${this.props.location.pathname}`,
        title: this.props.location.pathname,
    };
    return (
        <Container className={classes.layout}>
          <Helmet>
            <title>{`${blog.title} - ${blog.author}`}</title>
            <meta property="og:title" content={blog.title} />
            <meta property="og:type" content="blog" />
            {/* <meta name="description" content={blog.content.slice(0,100)} /> */}
          </Helmet>
          <Typography variant="h4" gutterBottom align="center" className={classes.title}>
            {blog.title}
          </Typography> 
          <Typography gutterBottom align="left" className={classes.author}>
            Created by {blog.author} on {blog.create} | Edited on {blog.edit}
          </Typography>
          { 
            this.state.contentReady ?
            <CircularProgress />
            :
            <div>
              <div className="js-toc"></div>
              <div className={classNames(classes.contentText, classes.content)}>
                <ReactMarkdown 
                  className="markdown" 
                  source={this.state.content}
                  renderers={{code: CodeBlock, heading: HeadingRenderer}}
                />
              </div>
              {
                blog.noedit ? 
                <div className={classes.buttons}></div>
                :
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleEdit}
                  component={RouterLink}
                  to={{ 
                    pathname: `/blogs/edit/${this.props.match.params.id}`, 
                    state: {
                      title: blog.title,
                      content: this.state.content,
                      author: blog.author,
                      image: blog.image,
                      tags: blog.tags,
                      id: blog.id
                    } 
                  }}
                >
                  Edit
                </Button>
              }
            </div>
          }
          <div>
            <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig} />
            <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </div>
        </Container>

    );
  }
}

export default connect(
  mapStateToProps,
  { getBlogsById }
)(withStyles(styles)(BlogView));