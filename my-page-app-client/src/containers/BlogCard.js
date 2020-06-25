import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink} from 'react-router-dom'
import zima from "../img/zima.jpg";
import blank from "../img/blank.jpg";



const styles = theme => ({
  card: {
    width: 'auto',
    height: 'auto',
    // padding: theme.spacing(2),
    maxWidth: 350,
    minWidth: 185,
    maxHeight: 240
  },
  media: {
    height: 120,
  },
  action: {
    height: 240,
  },
});

class BlogCard extends React.Component {

  // try the image link, make sure it works
  // async componentDidMount() {
  // }

  getImage() {
    let img = this.props.content.image;
    if (img === "zima")
      return zima;
    if (img === "blank" || img === "" || img === null || img === undefined)
      return blank;

    //if it is a valide url
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
      <Card elevation={4} className={classes.card}>
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
              date: this.props.date,
            } 
          }}
          className={classes.action}
        >
          <CardMedia
            className={classes.media}
            image={this.getImage()}
          />
          <CardContent>
            <Typography gutterBottom variant="inherit" component="h4">
              {this.trimLength(`${this.props.content.title}`, 40)}
            </Typography>
            <Typography component="p">
              {this.props.date}, by {this.trimLength(`${this.props.content.author}`, 40)}
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