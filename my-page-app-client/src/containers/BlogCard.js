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
import qiwei from "../img/qiwei.png";
import zima from "../img/zima.png";
import vpn from "../img/vpn.jpg";
import cloud from "../img/cloud.jpg";
import niceDesk from "../img/niceDesk.jpg";


const styles = {
  card: {
    width: 'auto',
    height: 'auto',
    maxWidth: 330,
    minWidth: 185,
    maxHeight: 250,
  },
  media: {
    height: 100,
  },
  action: {
    minHeight: 15,
  },
};

class BlogCard extends React.Component {

  getImage() {
    let name = this.props.image;
    if (name === "vpn")
      return vpn;
    if (name === "zima")
      return zima;
    if (name === "niceDesk")
      return niceDesk;
    if (name === "cloud")
      return cloud;
  }

  title() {
    let words = this.props.content.title.trim().split("\n")[0].split(" ");
    let t = "";
    for (var i = 0; i < words.length; i++) {
      t = t + " " + words[i];
      if (t.length > 25) {
        t = t + "...";
        break;
      }
    }
    return t;
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea 
          component={RouterLink}
          to={{ 
            pathname: this.props.link, 
            state: {
              title: this.props.content.title,
              content: this.props.content.content,
              noedit: this.props.noedit,
            } 
          }}
        >
          <CardMedia
            className={classes.media}
            image={this.getImage()}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {this.title()}
            </Typography>
            <Typography component="p">
              {this.props.date}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.action}>
          <Button 
            component={RouterLink}
            to={this.props.link}
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