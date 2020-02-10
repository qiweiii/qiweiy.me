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
import zima from "../img/zima.png";
import blank from "../img/blank.jpg";



const styles = theme => ({
  card: {
    width: 'auto',
    height: 'auto',
    maxWidth: 350,
    minWidth: 185,
    maxHeight: 260,
    [theme.breakpoints.up(1279)]: {
      minHeight: 260,
      width: 'auto',
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.down(1077) && theme.breakpoints.up('sm')]: {
      minHeight: 260,
      width: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.down('sm') && theme.breakpoints.up(1350)]: {
      width: 'auto',
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  media: {
    height: 120,
  },
  action: {
    minHeight: 20,
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
        <CardActions className={classes.action}>
          <Button 
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
            size="small" 
            color="primary"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

BlogCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogCard);