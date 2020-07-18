import React from "react";
import PropTypes from 'prop-types';
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


const styles = theme => ({
  layout: {
    maxWidth: 1100,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up(1100 + theme.spacing(2 * 2))]: {
      width: 'auto',
      margin: '3% 18% 3% 18%',
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
    color: '#616161',
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(3 * 2))]: {
      fontSize: 14,
      color: '#616161',
      paddingLeft: theme.spacing(5),
    },
  },
  content: {
    overflow: 'hidden',
    textAlign: 'left',
    minHeight: 400,
    [theme.breakpoints.up(600 + theme.spacing(3 * 2))]: {
      padding: theme.spacing(5),
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
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3 * 2))]: {
      marginLeft: theme.spacing(5),
    },
    marginBottom: theme.spacing(3),
  },
});


class BlogView extends React.Component {

  render() {
    const { classes } = this.props;
    const disqusShortname = 'qiweiy';
    const disqusConfig = {
        url: `https://qiweiy.me/blogs/view/${this.props.match.params.id}`,
        identifier: `/blogs/view/${this.props.match.params.id}`,
        title: this.props.location.state.title,
    };
    return (
      
        <Container className={classes.layout}>
          {/* <Paper elevation={6} className={classes.paper}> */}
            <Typography variant="h4" gutterBottom align="center" className={classes.title}>
              {this.props.location.state.title}
            </Typography> 
            <Typography gutterBottom align="left" className={classes.author}>
              Edited by {this.props.location.state.author} on {this.props.location.state.date}
            </Typography>
            <div className={classNames(classes.contentText, classes.content)}>
              <ReactMarkdown 
                className="markdown" 
                source={this.props.location.state.content}
                renderers={{code: CodeBlock}}
              />
            </div>
            {this.props.location.state.noedit ? 
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
                    title: this.props.location.state.title,
                    content: this.props.location.state.content,
                    author: this.props.location.state.author,
                    image: this.props.location.state.image,
                  } 
                }}
              >
                Edit
              </Button>
            }
          {/* </Paper> */}

          <div>
            <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
            </Disqus.CommentCount>
            <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </div>
        </Container>

    );
  }
}


BlogView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogView);