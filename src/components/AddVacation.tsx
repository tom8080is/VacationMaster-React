import { ChangeEvent, useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { MDBInput, MDBTypography } from "mdb-react-ui-kit";
import "./AddVacation.css";
import { useDispatch } from "react-redux";
import { ActionType } from "../redux/action-type";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

function AddVacation() {
  const [ErrorMessage, SetErrorMessage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    let userData: any = localStorage.getItem("token");
    if (!userData) {
      history.push("/login");
    } else {
      let parsedToken = JSON.parse(userData);
      let token = parsedToken.token;
      let userType = parsedToken.userType;
      let username = parsedToken.userName;
      console.log("token " + token);
      console.log("user Type " + userType);

      if (userType == "ADMIN") {
        if (token) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          dispatch({
            type: ActionType.getUser,
            payload: { userType: userType, username: username },
          });
        }
      } else {
        history.push("/customer");
      }
    }
  }, []);
  const [todayDate, setTodayDate] = useState("");
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

  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const history = useHistory();
  const onUploadClick = () => {
    Axios.post("http://localhost:3001/vacations", {
      destination: destination,
      description: description,
      fromDate: fromDate,
      toDate: toDate,
      price: price,
      image: image,
    })
      .then((Response) => {
        console.log(Response);
        alert("vacation added");
        goBack();
      })
      .catch((e) => {
        SetErrorMessage(e.response.data.error);
      });
  };
  const goBack = () => {
    history.push("/admin/");
  };
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
    setPrice(event.target.value);
  };
  const onImageChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  };

  return (
    <div className="registration">
      <div className="form-wrapper">
        <MDBTypography tag="h1">Add Vacation</MDBTypography>
        <MDBInput
          className="inputs"
          label="Destination"
          type="text"
          onChange={onDestinationChanged}
        />
        <br></br>
        <MDBInput
          className="inputs"
          label="Description"
          type="text"
          onChange={onDescriptionChanged}
        />
        <br></br>
        <MDBInput
          className="inputs"
          label="Price"
          type="number"
          onChange={onSetPriceChanged}
        />
        <br></br>
        <MDBInput
          className="inputs"
          label="Image"
          type="text"
          onChange={onImageChanged}
        />
        <br></br>
        <label>From Date:</label>
        <MDBInput
          className="inputs"
          type="date"
          onClick={todayDateAndTime}
          onChange={onFromDateChanged}
          min={todayDate}
        />
        <br></br>
        <label>To Date:</label>
        <MDBInput
          className="inputs"
          type="date"
          onClick={todayDateAndTime}
          onChange={onToDateChanged}
          min={todayDate}
        />
        <br></br>

        <div className="error">{ErrorMessage}</div>

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
            onClick={onUploadClick}
          >
            ADD
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
export default AddVacation;
