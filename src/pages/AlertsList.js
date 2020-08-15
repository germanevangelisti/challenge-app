import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button, Container, Box } from '@material-ui/core';
import AlertsTable from '../components/AlertTable'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AlertForm from '../components/AlertForm'

const useStyles = makeStyles((theme) => ({
    form: {
        flexGrow: 1,
    },
    searchButton: {
        marginTop: 10,
        marginLeft: 10,
        minWidth: 200
    },
    addButton: {
        marginTop: 10
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

export default function AlertsList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
     setOpen(false);
    };

    return (
        <Box component="div">
            <Typography variant="h5" component="h2">
                Alerts
            </Typography>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Name" />
                <TextField id="standard-basic" label="Status" />
                <span className={classes.searchButton}>
                    <Button variant="contained">Search</Button>
                </span>
            </form>
            <AlertsTable />
            <Box component="div" className={classes.addButton}>
                <Button variant="contained" color="primary" onClick={handleOpen}>New</Button>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <AlertForm />
                </Fade>
            </Modal>
        </Box>

)}