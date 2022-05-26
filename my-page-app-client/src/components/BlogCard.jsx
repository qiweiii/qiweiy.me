import React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import zima from '../img/zima.jpg'
import blank from '../img/blank.jpg'
import TagChips from './TagChips'

const PREFIX = 'BlogCard'

const classes = {
  card: `${PREFIX}-card`,
  media: `${PREFIX}-media`,
  cardContent: `${PREFIX}-cardContent`,
  authorDate: `${PREFIX}-authorDate`
}

const Root = styled('div')(() => ({
  [`& .${classes.card}`]: {},

  [`& .${classes.media}`]: {
    height: 180
  },

  [`& .${classes.cardContent}`]: {
    height: 130
  },

  [`& .${classes.authorDate}`]: {
    fontSize: '0.9em',
    color: 'silver'
  }
}))

class BlogCard extends React.Component {
  getImage() {
    let img = this.props.content.image
    if (img === 'zima') return zima
    if (img === 'blank' || img === '' || img === null || img === undefined) return blank
    return img
  }

  trimLength(str, len) {
    let words = str.trim().split('\n')[0].split(' ')
    let t = ''
    for (var i = 0; i < words.length; i++) {
      t = t + ' ' + words[i]
      if (t.length > len) {
        t = t + '...'
        return t
      }
    }
    return t
  }

  render() {
    return (
      <Root>
        <Card elevation={4} className={classes.card}>
          <CardActionArea component={RouterLink} to={{ pathname: this.props.link }}>
            <CardMedia className={classes.media} component="img" image={this.getImage()} loading="lazy" />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="inherit" component="h2" noWrap>
                {this.props.content.title}
              </Typography>
              <Typography component="p" noWrap className={classes.authorDate}>
                Create by {this.trimLength(this.props.content.author, 25)} on {this.props.createdAt}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <TagChips tags={this.props.content.tags} />
      </Root>
    )
  }
}

export default BlogCard
