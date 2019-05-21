import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink} from 'react-router-dom'


const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    minHeight: 500,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 5,
      padding: theme.spacing.unit * 3,
      minHeight: 500,
    },
  },
  title: {
    fontWeight: 500,
    padding: theme.spacing.unit * 3,
  },
  author: {
    fontSize: 14,
    color: '#616161',
    paddingLeft: theme.spacing.unit * 3,
  },
  content: {
    padding: theme.spacing.unit * 3,
    minHeight: 400,
    fontSize: 16,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  buttonDelete: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  }
});


class BlogView extends React.Component {

  async componentDidMount() {
    console.log(this.props);
  }

  // async componentDidMount() {
  //   try {
  //     let attachmentURL;
  //     const blog = await this.getNote();
  //     const { content, attachment } = blog;
  //     if (attachment) {
  //       attachmentURL = await Storage.vault.get(attachment);
  //     }

  //     this.setState({
  //       blog,
  //       content: content.content,
  //       title: content.title,
  //       attachmentURL
  //     });
  //   } catch (e) {
  //     alert(e);
  //   }
  // }

  // getNote() {
  //   return API.get("pages", `/pages/${this.props.match.params.id}`);
  // }

  // formatFilename(str) {
  //   return str.replace(/^\w+-/, "");
  // }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom align="center" className={classes.title}>
              {this.props.location.state.title}
            </Typography> 
            <Typography gutterBottom align="left" className={classes.author}>
              Created by {this.props.location.state.author}
            </Typography>
            <Typography align="justify" className={classes.content}>
              {this.props.location.state.content.split("\n").map((i, key) => {
                return <p key={key}>{i}</p>;
              })}
            </Typography>
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
                  } 
                }}
              >
                Edit
              </Button>
            }
         </Paper>
        </main>
      </React.Fragment>
    );
  }
}


BlogView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogView);