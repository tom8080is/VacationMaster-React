import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory } from "react-router-dom";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";
import { Bar } from "react-chartjs-2";




export default function ChartsContainer() {




  
  const dispatch = useDispatch();
  const history = useHistory();

  const labels = useSelector((state: AppState) => state.vacationChartNames);
  const data = useSelector((state: AppState) => state.vacationChartNumber);
  console.log(data);
  
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
      axios.get("http://localhost:3001/vacations/").then((response) => {
        let vacationsCharts = [];
        let vacationChartsFollowNum = [];
        let i = 0;
        console.log(response.data.length);
        
        while (i<response.data.length && response.data[i].amountOfFollowers > 0 ) {
          vacationsCharts.push(response.data[i].destination);
          vacationChartsFollowNum.push(response.data[i].amountOfFollowers);
          i++;
          
        }
        console.log(vacationsCharts);
        dispatch({
          type: ActionType.getFollowedNumberVacationChart,
          payload: vacationChartsFollowNum,
        });
        dispatch({
          type: ActionType.getFollowedVacationChart,
          payload: vacationsCharts,
        });
      });
    }
  }, []);

  return (
    <div>
      <Bar
        data={{
          labels: labels.map((data) => data),
          datasets : [{ label: 'Number Of Followers for vacations',
          data: data.map((data) => data),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],}]
        }}
        height={400}
        width={600}
        options={{maintainAspectRatio: false}}
        
                    
      />
    </div>
  );
}
