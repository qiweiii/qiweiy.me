import { Link as RouterLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { BlogContent } from 'src/types'
import TagChips from './TagChips'
import blank from '../img/blank.jpg'
import zima from '../img/5bc2e7.png'

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

export const getImage = (imgUri: string | null | undefined) => {
  if (imgUri === 'zima') return zima
  if (imgUri === 'blank' || imgUri === '' || imgUri === null || imgUri === undefined) return blank
  return imgUri
}

export const trimTextLength = (str: string, len: number) => {
  let words = str?.trim().split('\n')[0].split(' ') || []
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

const HtmlTooltip = styled<typeof Tooltip>(({ children, className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }}>
    {children}
  </Tooltip>
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}))

const BlogCard = ({
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
  return (
    <Root>
      <HtmlTooltip
        placement="top"
        title={
          <>
            <Typography color="inherit">{content?.title}</Typography>
            <em>
              {'By'}
              <u> {content?.author}</u>
            </em>
          </>
        }
      >
        <Card elevation={4} className={classes.card}>
          <CardActionArea component={RouterLink} to={{ pathname: link }}>
            <CardMedia className={classes.media} component="img" image={getImage(content?.image)} loading="lazy" />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="inherit" component="h1" noWrap>
                {content?.title}
              </Typography>
              <Typography component="p" noWrap className={classes.authorDate}>
                Create by {trimTextLength(content?.author, 25)} on {createdAt}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </HtmlTooltip>
      <TagChips tags={content?.tags} />
    </Root>
  )
}

export default BlogCard
