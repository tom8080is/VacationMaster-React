import { AppState } from "./app-state";
import { Action } from "./action";
import { ActionType } from "./action-type";
import UserModel from "../components/interfaces/UserModel";


export function reducer(oldAppState: AppState = new AppState(), action: Action): AppState {

    const newAppState = { ...oldAppState };

    switch (action.type) {

        case ActionType.getUser:
            newAppState.user = action.payload;
            break;

        case ActionType.GetAllVacations:
            newAppState.vacations = action.payload;
            break;

        case ActionType.editVacation:
            newAppState.vacation = action.payload;
            break;

        case ActionType.followVacation:
            newAppState.vacation = action.payload;
            break;
            
        case ActionType.getFollowedVacationChart:
            var newArray:any = [];
            newArray.push.apply(newArray, action.payload)
            newAppState.vacationChartNames = newArray;
            break;

        case ActionType.getFollowedNumberVacationChart:
            var NumberArray:any = [];
            NumberArray.push.apply(NumberArray, action.payload)
            newAppState.vacationChartNumber = NumberArray;
            break;

    }




    return newAppState;
}




