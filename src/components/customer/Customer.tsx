import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";

import { IVacation } from "../interfaces/IVacation";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "@fontsource/roboto";
import LocationOnTwoToneIcon from "@material-ui/icons/LocationOnTwoTone";
import "./Customer.css";

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
import { IconButton } from "@material-ui/core";

function Customer() {
  let vacationArray = useSelector((state: AppState) => state.vacations);

  const dispatch = useDispatch();
  const history = useHistory();

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
      if (userType == "CUSTOMER") {
        if (token) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          dispatch({
            type: ActionType.getUser,
            payload: { userType: userType, username: username },
          });
        }
      } else {
        history.push("/admin");
      }
    }
    getAllVacations();
  }, [vacationArray]);

  function getAllVacations() {
    axios
      .get(`http://localhost:3001/vacations/`)
      .then((response) => {
        dispatch({ type: ActionType.GetAllVacations, payload: response.data });
      })
      .catch((err) => {
        console.log("Failed to get data" + err);
      });
  }

  async function onFollowClick(props: IVacation) {
    if (props.isFollowed) {
      axios.delete(`http://localhost:3001/follows/${props.id}`);
    } else {
      axios.post(`http://localhost:3001/follows/`, { id: props.id });
    }
  }

  return (

    <div className="vacationContainer">
      {vacationArray.map((vacation: any, key: number) => (
        <MDBCard className="card" style={{ width: "18rem", height: "30rem" }}>
          <div className="DelBtn">
            <IconButton onClick={() => onFollowClick(vacation)}>
              {vacation.isFollowed && <FavoriteIcon />}
              {!vacation.isFollowed && <FavoriteBorderIcon />}
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

            {vacation.amountOfFollowers > 0 && (
              <MDBListGroupItem>
                {vacation.amountOfFollowers} People followed this vacation
              </MDBListGroupItem>
            )}
            {!vacation.amountOfFollowers && (
              <MDBListGroupItem>
                Be the first to like this vacation
              </MDBListGroupItem>
            )}
          </MDBListGroup>

          <div className="rounded-bottom  text-center pt-2">
            <ul className="list-unstyled list-inline font-small">
              <li className="list-inline-item  black-text">
                <MDBIcon far icon="clock" /> {vacation.fromDate} To:{" "}
                {vacation.toDate}
              </li>
            </ul>
          </div>
        </MDBCard>
      ))}
    </div>
  );
}

export default Customer;
