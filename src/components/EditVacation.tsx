import axios from "axios";
import { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/app-state";
import { useHistory } from "react-router-dom";
import "./EditVacation.css";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { MDBInput } from "mdb-react-ui-kit";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function EditVacation() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [ErrorMessage, SetErrorMessage] = useState("");
  const vacationToEdit = useSelector((state: AppState) => state.vacation);
  const [destination, setDestination] = useState(vacationToEdit.destination);
  const [description, setDescription] = useState(vacationToEdit.description);
  const [fromDate, setFromDate] = useState(vacationToEdit.fromDate);
  const [toDate, setToDate] = useState(vacationToEdit.toDate);
  const [price, setPrice] = useState(vacationToEdit.price);
  const [image, setImage] = useState(vacationToEdit.image);
  const [todayDate, setTodayDate] = useState("");
  console.log(image);
  const onDestinationChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };
  const onDescriptionChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const onFromDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };
  const onToDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };
  const onSetPriceChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(+event.target.value);
  };
  const onImageChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  };

  const goBack = () => {
    history.push("/admin/");
  };

  function todayDateAndTime() {
    let today: any = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    setTodayDate(today);
  }

  const confirmChange = () => {
    axios
      .put(`http://localhost:3001/vacations/${vacationToEdit.id}`, {
        destination: destination,
        description: description,
        fromDate: fromDate,
        toDate: toDate,
        price: price,
        image: image,
      })

      .then(() => {
        console.log(vacationToEdit);
        history.push("/admin/");
      })
      .catch((e) => {
        SetErrorMessage(e.response.data.error);
      });
  };
  return (
    <div className="registration">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CreateTwoToneIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Vacation
          </Typography>
          <div className="inputDiv">
            <label>Image:</label>
            <MDBInput
              type="text"
              defaultValue={vacationToEdit.image}
              onChange={onImageChanged}
            />
            <br></br>
            <label>Destination:</label>
            <br></br>
            <MDBInput
              type="text"
              defaultValue={vacationToEdit.destination}
              onChange={onDestinationChanged}
            />
            <br></br>
            <label>Description:</label>
            <br></br>
            <MDBInput
              type="text"
              defaultValue={vacationToEdit.description}
              onChange={onDescriptionChanged}
            />
            <br></br>
            <label>from Date:</label>
            <br></br>
            <MDBInput
              type="date"
              defaultValue={vacationToEdit.fromDate}
              onClick={todayDateAndTime}
              onChange={onFromDateChanged}
              min={todayDate}
            />
            <br></br>
            <label>to Date:</label>
            <br></br>
            <MDBInput
              type="date"
              defaultValue={vacationToEdit.toDate}
              onChange={onToDateChanged}
              min={todayDate}
              onClick={todayDateAndTime}
            />
            <br></br>
            <label>Price:</label>
            <br></br>
            <MDBInput
              type="number"
              defaultValue={vacationToEdit.price}
              onChange={onSetPriceChanged}
            />
            <div className="error">{ErrorMessage}</div>
          </div>
          <div className="btnDiv">
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<KeyboardBackspaceIcon />}
                onClick={goBack}
              >
                Go Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={confirmChange}
              >
                Save
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default EditVacation;
