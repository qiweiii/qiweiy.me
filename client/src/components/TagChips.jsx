import React from 'react'
import { styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import { connect } from 'react-redux'
import { setFilter } from '../actions'

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

function TagChips(props) {
  const tags = props.tags ? props.tags.split(/\s*[,，]\s*/) : []
  return (
    <Root className={classes.root}>
      {tags &&
        tags.map((tag) => (
          <Chip
            className={classes.chips}
            key={tag}
            size="small"
            label={'#' + tag}
            clickable
            onClick={() => props.setFilter(tag)}
            color="primary"
          />
        ))}
    </Root>
  )
}

export default connect(null, { setFilter })(TagChips)
