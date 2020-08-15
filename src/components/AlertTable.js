import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Container, Box } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { setAlertNotification } from './../store/alertNotification/actions';
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    tableContainer: {
        marginTop: 10
    }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow);

function createData(id, name, source, metric, trigger, value, state) {
    return { id, name, source, metric, trigger, value, state: state };
}

async function handleUpdateAlarm (param) {
    let alert = {
        name: param.name,
        metricSource: param.source,
        metricUnit: param.metric,
        conditional: param.trigger,
        value: param.value,
        state: !param.state
    }
    await fetch('/alert/' + param.id, {
      method: 'PUT',
      body: JSON.stringify(alert),
      headers: {
        'Content-Type': 'application/json'
      }
    });
}

export function AlertsTable({ setAlertNotification }) {
    const classes = useStyles();
    const [alerts, setAlerts] = React.useState([]);
    const [updateAlerts, setUpdateAlerts] = React.useState(false);

    React.useEffect(() => {
        fetch('http://localhost:3000/alert/')
        .then(results => results.json())
        .then(data => {
            const formatedData = data.map((e) => createData(e._id, e.name, e.metricSource, e.metricUnit, e.conditional, e.value, e.state))
            setAlertNotification(data.filter(e => e.state).length)
            setAlerts(formatedData)
        });
    }, [updateAlerts]);

    const handleState = (values) => {
        handleUpdateAlarm(values)
        .then(data => setUpdateAlerts(!updateAlerts))
    }

    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Source</StyledTableCell>
                    <StyledTableCell align="right">Metric</StyledTableCell>
                    <StyledTableCell align="right">Trigger</StyledTableCell>
                    <StyledTableCell align="right">Paused</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {alerts.map((row) => (
                    <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.source}</StyledTableCell>
                    <StyledTableCell align="right">{row.metric}</StyledTableCell>
                    <StyledTableCell align="right">{row.trigger === 'higher' ? '>' : '<'} {row.value}%</StyledTableCell>
                    <StyledTableCell align="right">{!row.state ? 'YES': 'NO' }</StyledTableCell>
                    <StyledTableCell align="right">
                        <Button variant="contained" color="primary">Edit</Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Button variant="contained" color="primary">Delete</Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Button variant="contained" color="primary" onClick={() => handleState(row)}>
                            {!row.state ? 'Resume' : 'Pause'}
                        </Button>
                    </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default connect(null, { setAlertNotification })(AlertsTable)