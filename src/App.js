import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import EventCalendar from "./EventCalendar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from "./AppBar";
toast.configure({
  autoClose: 2000,
  draggable: false,
  //etc you get the idea
});
function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const [eventForm, setEventForm] = useState({
    event: "",
    to: "",
    from: "",
  });
  function validate() {
    if (eventForm.event == "" || eventForm.to == "" || eventForm.from == "") {
      toast.error("Please input all fields");
      return false;
    }
    return true;
  }

  function handleChange(event) {
    const value = event.target.value;

    setEventForm({ ...eventForm, [event.target.name]: value });

    console.log(eventForm, "haha");
  }

  function submitForm() {
    const isValidate = validate();

    let from_date = new Date(eventForm.from);
    let to_date = new Date(eventForm.to);
    console.log(from_date < to_date);

    if (isValidate == true) {
      if (from_date <= to_date) {
        axios
          .post(`https://murmuring-retreat-33974.herokuapp.com/api/add-event`, {
            eventForm,
          })
          .then((res) => {
            if (res) {
              toast.success("Success Adding Event");

              window.location.replace("/");
            }
          });
      } else {
        toast.error("End date must be greater than start date");
      }
    }
  }

  const classes = useStyles();
  return (
    <div className="App">
      <Appbar />

      <Container maxWidth="lg">
        <Grid container spacing={0}>
          <Grid item xs={12} md={6} lg={6} style={{padding: '10px'}}>
            <TextField
              id="standard-basic"
              label="Event Name"
              name="event"
              style={{ width: "80%" }}
              onChange={handleChange}
            />
            <br />
            <br />
            <TextField
              id="date"
              label="From"
              type="date"
              name="from"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <TextField
              id="date"
              label="To"
              type="date"
              name="to"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={submitForm}>
              Add Event
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={6} style={{padding: '10px'}}>
            <EventCalendar />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
