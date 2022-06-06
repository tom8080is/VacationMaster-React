import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";

import { IVacation } from "../interfaces/IVacation";

import "./AdminPage.css";
import { IconButton } from "@material-ui/core";

import LocationOnTwoToneIcon from "@material-ui/icons/LocationOnTwoTone";

import {
  MDBIcon,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

function AdminPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ErrorMessage, SetErrorMessage] = useState("");

  const vacationArray = useSelector((state: AppState) => state.vacations);

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
        history.push("/");
      }
    }
    axios
      .get("http://localhost:3001/vacations/")
      .then((response) => {
        dispatch({ type: ActionType.GetAllVacations, payload: response.data });
      })
      .catch((e) => {
        SetErrorMessage(e.response.data.error);
      });
  }, [vacationArray]);

  const onRemoveVacationClicked = async (props: IVacation) => {
    if (window.confirm("Are you sure you want to delete this vacation?")) {
      try {
        await axios.delete(`http://localhost:3001/vacations/${props.id}`);
      } catch (e) {}
    }
  };

  const editHandler = (props: IVacation) => {
    dispatch({ type: ActionType.editVacation, payload: props });
    history.push(`/editVacation/${props.id}`);
  };

  return (
    <div>

      <div className="vacationContainer">
        {vacationArray.map((vacation: any, key: number) => (
          <div key={key} className="vacation">
            <MDBCard
              className="card"
              style={{ width: "18rem", height: "25rem" }}
            >
              <div className="DelBtn">
                <IconButton onClick={() => onRemoveVacationClicked(vacation)}>
                  <MDBIcon color="black" icon="times" />
                </IconButton>
              </div>

              <div className="EditBtn">
                <IconButton onClick={() => editHandler(vacation)}>
                  <MDBIcon icon="pencil-alt" />
                </IconButton>
              </div>

              <MDBCardImage position="top" alt="." src={vacation.image} />

              <MDBCardBody>
                <MDBCardTitle className="light-blue-text">
                  <LocationOnTwoToneIcon fontSize="small"></LocationOnTwoToneIcon>
                  {vacation.destination}
                </MDBCardTitle>
                <MDBCardText className="black-text">
                  {vacation.description}
                </MDBCardText>
              </MDBCardBody>
              <MDBListGroup flush>
                <MDBListGroupItem className="orange-text  price">
                  Price: {vacation.price}$
                </MDBListGroupItem>
              </MDBListGroup>

              <div className="rounded-bottom  text-center pt-2">
                <ul className="list-unstyled list-inline font-small">
                  <li className="list-inline-item  black-text">
                    <MDBIcon far icon="clock" /> {vacation.fromDate} To:{" "}
                    {vacation.toDate}
                  </li>

                  <li className="list-inline-item">
                    <a href="#!" className="white-text">
                      <MDBIcon fab icon="facebook-f" className="mr-1" />
                      {vacation.amountOfFollowers}
                    </a>
                  </li>
                </ul>
              </div>
            </MDBCard>
            <div className="error">{ErrorMessage}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
