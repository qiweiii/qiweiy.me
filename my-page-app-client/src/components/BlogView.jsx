import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink} from 'react-router-dom'
import Disqus from 'disqus-react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from "./CodeBlock.jsx";
import "./BlogView.css";
import classNames from 'classnames';
import { Helmet } from "react-helmet";
import HeadingRenderer from './HeadingRenderer'
import * as tocbot from 'tocbot';
import { API } from "aws-amplify";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from 'react-redux';


const styles = theme => ({
  layout: {
    width: 'auto',
    maxWidth: 880,
    margin: 'auto',
    [theme.breakpoints.down(1600)]: {
      margin: '3% 23% 3% 15%',
    },
    [theme.breakpoints.down(1280 + theme.spacing(3 * 2))]: {
      margin: '3% 23% 3% 15%',
    },
    [theme.breakpoints.down(1100)]: {
      margin: '3% 12%',
    },
    [theme.breakpoints.down(600 + theme.spacing(3))]: {
      margin: 'auto',
    },
    padding: "0px 10px"
  },
  title: {
    fontSize: '2.2rem',
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
    minHeight: 400,
    maxWidth: 880,
    fontSize: '1.15rem',
    lineHeight: '1.8',
    padding: theme.spacing(1),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    marginTop: "150px"
  },
});


class BlogView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editedAt: "",
      createdAt: "",
      content: "",
      author: "",
      title: "",
      imageUrl: "",
      tags: "",
      id: "",
      contentReady: false,
    }
  }

  async componentDidMount() {
    // maybe should do string compression and decompression
    const id = this.props.location.pathname.split('-').slice(-5).join('-');
    try {
      const res = await API.get("pages", `/pages/${id}`);
      // console.log(res);
      this.setState({ 
        editedAt: new Date(res.editedAt).toLocaleDateString('en-US', { hour12: false }),
        createdAt: new Date(res.createdAt).toLocaleDateString('en-US', { hour12: false }),
        content: res.content.content,
        author: res.content.author,
        title: res.content.title,
        imageUrl: res.content.image,
        tags: res.content.tags,
        id: res.noteId,
        contentReady: true
      });
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
      });
    } catch (e) {
      console.log(e);
      alert("Blog does not exist.");
      this.props.history.push("/blogs");
    }
  }

  render() {
    const { classes } = this.props;
    const disqusShortname = 'qiweiy';
    return (
      <div>
        <div>
          <div className="js-toc"></div>
        </div>
          
        { 
          this.state.contentReady ?
            <Container className={classes.layout}>
            <div>
              <Helmet>
                <title>{`${this.state.title} - ${this.state.author}`}</title>
                <meta property="og:title" content={this.state.title} />
                <meta property="og:type" content="blog" />
                {/* <meta name="description" content={blog.content.slice(0,100)} /> */}
              </Helmet>
              <Typography variant="h4" gutterBottom align="center" className={classes.title}>
                {this.state.title}
              </Typography> 
              <Typography gutterBottom align="left" className={classes.author}>
                Created by {this.state.author} on {this.state.createdAt} | Edited on {this.state.editedAt}
              </Typography>
              
              <div className={classNames(classes.contentText, classes.content)}>
                <ReactMarkdown 
                  className="markdown" 
                  source={this.state.content}
                  renderers={{code: CodeBlock, heading: HeadingRenderer}}
                  escapeHtml={false}
                />
              </div>
              {
                !this.props.userHasAuthenticated ? 
                <div className={classes.buttons}></div>
                :
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleEdit}
                  component={RouterLink}
                  to={{ 
                    pathname: `/blogs/edit/${this.state.id}`, 
                    state: {
                      title: this.state.title,
                      content: this.state.content,
                      author: this.state.author,
                      image: this.state.imageUrl,
                      tags: this.state.tags,
                      id: this.state.id
                    } 
                  }}
                >
                  Edit
                </Button>
              }

              {/* Load Disqus */}
              <div>
                {/* <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig} /> */}
                <Disqus.DiscussionEmbed 
                  shortname={disqusShortname} 
                  config={{
                    url: `https://qiweiy.me/blogs/view/${this.props.location.pathname}`,
                    identifier: `/blogs/view/${this.props.location.pathname}`,
                    title: this.state.title,
                  }}
                />
              </div>
            </div>
          </Container>
          :
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        }
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
  null
)(withStyles(styles)(BlogView));