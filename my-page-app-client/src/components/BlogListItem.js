import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link as RouterLink } from 'react-router-dom'
import zima from "../img/zima.jpg";
import blank from "../img/blank.jpg";


const styles = theme => ({
  listItem: {
    minHeight: '120px',
    [theme.breakpoints.down(600 + theme.spacing(3 * 2))]: {
      minHeight: '150px',
    },
  },
  authorDate: {
    fontSize: "0.9em",
    color: "silver"
  }
});

class BlogListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shadow: 0,
    }
  }

  // fake hover behaviour
  onMouseOver = () => this.setState({ shadow: 10 });
  onMouseOut = () => this.setState({ shadow: 0 });

  getImage() {
    let img = this.props.content.image;
    if (img === "zima")
      return zima;
    if (img === "blank" || img === "" || img === null || img === undefined)
      return blank;

    //if it is a valid url
    return img;
  }

  trimLength(str, len) {
    let words = str.trim().split("\n")[0].split(" ");
    let t = "";
    for (var i = 0; i < words.length; i++) {
      t = t + " " + words[i];
      if (t.length > len) {
        t = t + "...";
        return t;
      }
    }
    return t;
  }

  render() {
    const { classes } = this.props;
    return (
      <Box 
        boxShadow={this.state.shadow}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <ListItem
          className={classes.listItem}
          button
          component={RouterLink}
          to={{ 
            pathname: this.props.link, 
            state: {
              title: this.props.content.title,
              content: this.props.content.content,
              author: this.props.content.author,
              image: this.props.content.image,
              noedit: this.props.noedit,
              edit: this.props.edit,
              create: this.props.create,
              id: this.props.id
            } 
          }}
        >
          <ListItemAvatar>
            <Avatar variant="rounded" src={this.getImage()} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography gutterBottom variant="inherit" component="h2" noWrap>
                {this.props.content.title}
             </Typography>
            }
            secondary={
              <Typography component="p" align="right" className={classes.authorDate} noWrap>
                Create by {this.trimLength(this.props.content.author, 30)} on {this.props.create}
              </Typography>
            }
          />
        </ListItem>
      </Box>
    );
  }
}

BlogListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogListItem);