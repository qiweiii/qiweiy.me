import { styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'

import { useAppData } from 'src/hooks/appData'

const PREFIX = 'TagChips'

const classes = {
  root: `${PREFIX}-root`,
  chips: `${PREFIX}-chips`
}

const Root = styled('div')(() => ({
  [`&.${classes.root}`]: {
    // padding: theme.spacing(1),
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'wrap'
  },
  [`& .${classes.chips}`]: {
    marginLeft: '4px',
    marginTop: '3px',
    fontSize: '0.9em'
  }
}))

function TagChips({ tags }: { tags: string }) {
  const { setBlogsFilter } = useAppData()
  const tagsList = tags ? tags.split(/\s*[,，]\s*/) : []

  return (
    <Root className={classes.root}>
      {tagsList.length >= 0 &&
        tagsList.map((tag) => (
          <Chip
            className={classes.chips}
            key={tag}
            size="small"
            label={'#' + tag}
            clickable
            onClick={() => setBlogsFilter(tag)}
            color="primary"
          />
        ))}
    </Root>
  )
}

export default TagChips
