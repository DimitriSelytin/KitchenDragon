import {combineReducers} from "redux";
import studentProfileReducer from "./student-profiles.reducer";

const RootReducer = combineReducers({
  studentProfiles: studentProfileReducer
});

export default RootReducer