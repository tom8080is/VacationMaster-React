import { IVacation } from "../components/interfaces/IVacation"
import UserModel from "../components/interfaces/UserModel";






export class AppState {

    user={userType:'',
  username:''};
    vacations: IVacation[] =[];
    vacation: IVacation = {
    id: 0,
    description:'',
    destination:'',
    image:'',
    fromDate:'', 
    toDate: '' ,
    price: 0,
    amountOfFollowers:0,

  }
  vacationChartNumber=[];
  vacationChartNames=[];
    }