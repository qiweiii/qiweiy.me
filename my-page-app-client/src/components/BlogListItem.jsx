import React from 'react'
import withStyles from '@mui/styles/withStyles'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link as RouterLink } from 'react-router-dom'
import zima from '../img/zima.jpg'
import blank from '../img/blank.jpg'
import TagChips from './TagChips'

const styles = () => ({
  listItem: {
    minHeight: '120px',
    border: '1px solid #e0e0e0'
  },
  authorDate: {
    fontSize: '0.9em',
    color: 'silver'
  }
})

class BlogListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shadow: 0
    }
  }

  // fake hover behaviour
  onMouseOver = () => this.setState({ shadow: 4 })
  onMouseOut = () => this.setState({ shadow: 0 })

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
    const { classes } = this.props
    return (
      <>
        <Box boxShadow={this.state.shadow} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
          <ListItem className={classes.listItem} button component={RouterLink} to={{ pathname: this.props.link }}>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                src={this.getImage()}
                imgProps={{ loading: 'lazy', width: '60px', height: '60px' }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography gutterBottom variant="inherit" component="h2" noWrap>
                  {this.props.content.title}
                </Typography>
              }
              secondary={
                <Typography component="p" align="right" className={classes.authorDate} noWrap>
                  Create by {this.trimLength(this.props.content.author, 30)} on {this.props.createdAt}
                </Typography>
              }
            />
          </ListItem>
        </Box>
        <TagChips tags={this.props.content.tags} />
      </>
    )
  }
}

export default withStyles(styles)(BlogListItem)
