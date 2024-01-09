import { Link as RouterLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import { BlogContent } from 'src/types'
import { getImage, trimTextLength } from './BlogCard'
import TagChips from './TagChips'

const PREFIX = 'BlogListItem'

const classes = {
  listItem: `${PREFIX}-listItem`,
  authorDate: `${PREFIX}-authorDate`
}

const Root = styled('div')(() => ({
  [`& .${classes.listItem}`]: {
    minHeight: '120px',
    border: '1px solid #e0e0e0'
  },
  [`& .${classes.authorDate}`]: {
    fontSize: '0.9em',
    color: 'silver'
  }
}))

const BlogListItem = ({
  content,
  link,
  createdAt
}: {
  content: BlogContent
  link: string
  createdAt: string
  editedAt: string
  id: string
}) => {
  const [shadow, setShadow] = useState(0)

  // fake hover behaviour
  const onMouseOver = () => setShadow(4)
  const onMouseOut = () => setShadow(0)

  return (
    <Root>
      <Box boxShadow={shadow} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <ListItem className={classes.listItem} button component={RouterLink} to={{ pathname: link }}>
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              src={getImage(content.image)}
              imgProps={{ loading: 'lazy', width: '60px', height: '60px' }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography gutterBottom variant="inherit" component="h2" noWrap>
                {content?.title}
              </Typography>
            }
            secondary={
              <Typography component="p" align="right" className={classes.authorDate} noWrap>
                Create by {trimTextLength(content?.author, 30)} on {createdAt}
              </Typography>
            }
          />
        </ListItem>
      </Box>
      <TagChips tags={content?.tags} />
    </Root>
  )
}

export default BlogListItem
