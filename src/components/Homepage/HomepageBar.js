import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Upload from '@material-ui/icons/CreateNewFolderRounded';

import deburr from "lodash/deburr";
import Downshift from "downshift";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";

import Airtable from 'airtable';

const TABLE_NAME = 'Student';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

var suggestions =[];

table.select({
  view: "Grid view",
}).eachPage((records, fetchNextPage) => {
  const student_id = records.map((record, index) => record.fields['student_id']);
  for(var i = 0; i < student_id.length; i++){
    suggestions.push({label : student_id[i]});
  }
  fetchNextPage();
}
);

// const suggestions = [
//   { label: "403235627" },
//   { label: "403235382" },
//   { label: "403235039" },
//   { label: "403235623" },
//   { label: "403235837" },
//   { label: "404893857" },
//   { label: "404893394" },
//   { label: "404893039" },
//   { label: "405938471" },
//   { label: "405938432" },
//   { label: "405938948" },
//   { label: "405938038" },
//   { label: "406192384" },
//   { label: "406192392" },
//   { label: "406192102" },
//   { label: "406192382" }
// ];

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}


renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const keep =
        count < 5 &&
        suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

const styles = theme => ({
  root: {
    width: '90%',
    minWidth: 1000,
    marginLeft: '5%',
    margin: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    color: '#111B24',
    width: theme.spacing.unit * 6,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
  },
  // inputRoot: {
  //   color: '#111B24',
  //   width: '100%',
  // },
  // inputInput: {
  //   paddingTop: theme.spacing.unit,
  //   paddingRight: theme.spacing.unit,
  //   paddingBottom: theme.spacing.unit,
  //   paddingLeft: theme.spacing.unit * 5,
  //   transition: theme.transitions.create('width'),
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     width: 90,
  //     '&:focus': {
  //       width: 120,
  //     },
  //   },
  // },
  input: {
    display: 'none',
  },
  button: {
    backgroundColor: '#111B24',
    color: 'white',
  },
  UploadIcon: {
    marginRight: theme.spacing.unit * 1,
  },

  auto: {
    flexGrow: 1,
    height: 35,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: 90,
      '&:focus': {
        width: 120,
      },
    },
  },
  container: {
    flexGrow: 1,
    position: "relative",
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  inputRoot: {
    color: '#111B24',
    flexWrap: "wrap",
  },
  inputInput: {
    // width: "auto",
    paddingLeft: theme.spacing.unit * 5,
    flexGrow: 1,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 90,
      '&:focus': {
        width: 120,
      },
    },
  },
});

function SearchAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root} >
      <AppBar position="static" style={{ backgroundColor: '#FFBF5F', borderRadius: '5px' }}>
        <Toolbar>
          <div className={classes.auto}>
            <Downshift id="downshift-simple">
              {({
                getInputProps,
                getItemProps,
                getMenuProps,
                highlightedIndex,
                inputValue,
                isOpen,
                selectedItem
              }) => (

                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    {renderInput({
                      classes,
                      InputProps: getInputProps({
                        placeholder: "搜尋學號"
                      })
                    })}
                    <div {...getMenuProps()}>
                      {isOpen ? (
                        <NavLink style={{textDecoration:'none'}} activeClassName="active" to={{pathname:'/student', aboutProps:{name:"405401279"}}}>
                        <Paper className={classes.paper} square>
                          {getSuggestions(inputValue).map((suggestion, index) =>
                            renderSuggestion({
                              suggestion,
                              index,
                              itemProps: getItemProps({ item: suggestion.label }),
                              highlightedIndex,
                              selectedItem
                            })
                          )}
                        </Paper>
                        </NavLink>
                      ) : null}
                    </div>
                  </div>
                )}
            </Downshift>
          </div>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="學號查詢…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div> */}
          <div className={classes.grow} />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" className={classes.button}>
              <Upload className={classes.UploadIcon} />
              匯入學生資料
        </Button>
          </label>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAppBar);
