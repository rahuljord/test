import { combineReducers } from "redux";
import { leaveReducer, selectedLeaveReducer, leaveTypesReducer, empTypesReducer,selectedLeaveHistroy,selectedLeaveLog } from "./LeaveReducer";

//assign variable name to reducer so that we can access it inside component using this variable name
const reducers = combineReducers({
    allLeaves: leaveReducer,
    leave: selectedLeaveReducer,
    leaveTypes: leaveTypesReducer,
    empTypes: empTypesReducer,
    leaveHistory:selectedLeaveHistroy,
    selectedLeaveLog:selectedLeaveLog,
    
});

export default reducers;