import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import { setFilter } from "../actions";

const styles = theme => ({
  root: {
    // padding: theme.spacing(1),
    marginTop: "7px",
    marginBottom: "8px",
    marginRight: "2px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // color: "red",
  },
  chips: {
    marginLeft: "4px",
    fontSize: "0.9em",
  }
});

function TagChips(props) {
  const { classes } = props;
  const tags = props.tags ? props.tags.split(/\s*[,，]\s*/) : [];
  return (
      <div className={classes.root}>
        {tags && tags.map(tag => 
          <Chip
            className={classes.chips}
            key={tag}
            size="small"
            label={"#" + tag}
            clickable
            onClick={() => props.setFilter(tag)}
            color="primary"
          />
        )}
      </div>
  );
}

export default connect(
  null,
  { setFilter }
)(withStyles(styles)(TagChips));