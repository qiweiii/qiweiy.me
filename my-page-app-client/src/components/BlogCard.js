import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink} from 'react-router-dom'
import zima from "../img/zima.jpg";
import blank from "../img/blank.jpg";


const styles = theme => ({
  // card: {
  // },
  media: {
    height: 180,
  },
  // action: {
  // },
  cardContent: {
    height: 140,
  },
  authorDate: {
    fontSize: "0.9em",
    color: "silver"
  }
});

class BlogCard extends React.Component {

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
      <Card elevation={8} className={classes.card}>
        <CardActionArea 
          component={RouterLink} 
          to={{ 
            pathname: this.props.link, 
            state: {
              title: this.props.content.title,
              content: this.props.content.content,
              author: this.props.content.author,
              image: this.props.content.image,
              noedit: this.props.noedit,
              edit: this.props.edit, // edited time
              create: this.props.create, // created time
              id: this.props.id
            } 
          }}
          className={classes.action}
        >
          <CardMedia
            className={classes.media}
            image={this.getImage()}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="inherit" component="h2" noWrap>
              {this.props.content.title}
            </Typography>
            <Typography component="p" noWrap className={classes.authorDate}>
              Create by {this.trimLength(this.props.content.author, 25)} on {this.props.create}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

BlogCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogCard);