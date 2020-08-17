import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Box } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { setAllAlerts } from "../store/alert/reducer";
import { setAlerts } from "../store/alert/actions";
import { setAlertSearchState } from "../store/alert/actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formControl: {
    flexGrow: 1,
  },
  statusSearch: {
    minWidth: 120,
  },
  searchResult: {
    color: theme.palette.warning.dark,
  },
}));

export function AlertSearch({ alerts, setAlerts, setAlertSearchState, reset }) {
  const classes = useStyles();
  const [nameSearch, setNameSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState("");
  const [statusSearch, setStatusSearch] = React.useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchResult("");
    const searchResult = alerts.filter((e) => {
      if (nameSearch) {
        return e.name === nameSearch && e.state === statusSearch;
      } else return e.state === statusSearch;
    });
    if (!searchResult.length) {
      setSearchResult("There is no alert with those parameters.");
    } else {
      setAlerts(searchResult);
      setAlertSearchState(true);
    }
  };

  const handleReset = () => reset();

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <form onSubmit={handleSearch}>
        <Box display="flex" flexDirection="row">
          <Box p={1}>
            <TextField
              id="filled-basic"
              label="Name"
              variant="filled"
              value={nameSearch}
              onInput={(e) => setNameSearch(e.target.value)}
            />
          </Box>
          <Box p={1}>
            <Select
              labelId="status-search"
              id="status-search"
              value={statusSearch}
              onChange={(e) => setStatusSearch(e.target.value)}
              className={classes.statusSearch}
            >
              <MenuItem value="">
                <em>Select an alarm status</em>
              </MenuItem>
              <MenuItem value={false}>Paused</MenuItem>
              <MenuItem value={true}>Active</MenuItem>
            </Select>
          </Box>
          <Box p={1}>
            <Button variant="contained" color="primary" type="submit">
              Search
            </Button>
          </Box>
        </Box>
      </form>
      <Box p={1}>
        <p className={classes.searchResult}>{searchResult}</p>
      </Box>
    </FormControl>
  );
}

function mapStateToProps(state) {
  return {
    alerts: setAllAlerts(state),
  };
}

export default connect(mapStateToProps, { setAlerts, setAlertSearchState })(
  AlertSearch
);
