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

  render() {
    const { classes } = this.props;
    const disqusShortname = 'qiweiy';
    const content = this.props.location.state;
    const disqusConfig = {
        url: `https://qiweiy.me/blogs/view/${this.props.location.pathname}`,
        identifier: `/blogs/view/${content.id}`,
        title: content.title,
    };
    return (
        <Container className={classes.layout}>
          <Helmet>
            <title>{`${content.title} - ${content.author}`}</title>
            <meta property="og:title" content={content.title} />
            <meta property="og:type" content="blog" />
            <meta name="description" content={content.content.slice(0,100)} />
          </Helmet>
          {/* <Paper elevation={6} className={classes.paper}> */}
            <Typography variant="h4" gutterBottom align="center" className={classes.title}>
              {content.title}
            </Typography> 
            <Typography gutterBottom align="left" className={classes.author}>
              Created by {content.author} on {content.create} | Edited on {content.edit}
            </Typography>
            <div className={classNames(classes.contentText, classes.content)}>
              <ReactMarkdown 
                className="markdown" 
                source={content.content}
                renderers={{code: CodeBlock}}
              />
            </div>
            {content.noedit ? 
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
                    title: content.title,
                    content: content.content,
                    author: content.author,
                    image: content.image,
                    tags: content.tags,
                    id: content.id
                  } 
                }}
              >
                Edit
              </Button>
            }
          {/* </Paper> */}

          <div>
            <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig} />
            <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </div>
        </Container>

    );
  }
}

export default withStyles(styles)(BlogView);