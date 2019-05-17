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


const styles = {
  card: {
    width: 'auto',
    height: 'auto',
    maxWidth: 330,
    maxHeight: 240,
  },
  media: {
    height: 100,
  },
};

class BlogCard extends React.Component {
  
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea 
          component={RouterLink}
          to={this.props.link}
        >
          <CardMedia
            className={classes.media}
            image={this.props.attachment}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.title}
            </Typography>
            <Typography component="p">
              {this.props.content}
            </Typography>
            <Typography component="p">
              {this.props.date}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
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