import { ActionTypes } from "../constants/action-types"
import leaveapi from "../../../apis/leaveapi";
import { format } from "date-fns";
import { Redirect } from 'react-router-dom'

//to fetch all leaves
export const fetchLeaves = () => async (dispatch) => {
  const response = await leaveapi.get("/leaves");
  dispatch({ type: ActionTypes.FETCH_LEAVES, payload: response.data });
};

//to fetch leave by id
export const fetchLeave = (id) => async (dispatch) => {
  const response = await leaveapi.get(`/leaves/${id}`);
  //make dates related changes
  const obj = response.data;
  obj.startDate = new Date(obj.startDate);
  obj.endDate = new Date(obj.endDate);
  dispatch({ type: ActionTypes.FETCH_LEAVE, payload: obj });
};

export const removeSelectedLeave = (id) => async (dispatch) => {
  const response = await leaveapi.delete(`/leaves/${id}`);
  dispatch({ type: ActionTypes.FETCH_LEAVE, payload: response.data });
};


//to fetch default leave types
export const fetchLeaveTypes = () => async (dispatch) => {
  const response = await leaveapi.get(`leaves/leaveTypes`);
  dispatch({ type: ActionTypes.FETCH_LEAVE_TYPES, payload: response.data });
};

//to fetch emp types
export const fetchEmpTypes = () => async (dispatch) => {
  const response = await leaveapi.get(`leaves/users`);
  dispatch({ type: ActionTypes.FETCH_EMP_TYPES, payload: response.data });
};

//to fetch leave history of sleected leave
export const fetchSelectedLeaveHistory = (id) => async (dispatch) => {
  const response = await leaveapi.get(`leaves/recentleaves/${id}`);
  dispatch({ type: ActionTypes.FETCH_SELECTED_LEAVE_HISTORY, payload: response.data });
};

//To submit leave
export const submitLeaveAction = (leave) => async (dispatch) => {
  let _leave = { ...leave };
  _leave.startDate = format(_leave.startDate, 'yyyy-MM-dd');
  _leave.endDate = format(_leave.endDate, 'yyyy-MM-dd');
  const response = await leaveapi.post(`/leaves/submit`, _leave);
  dispatch({ type: ActionTypes.SUBMIT_LEAVE, payload: response.data });
};

//To save leave
export const updateLeaveAction = (leave) => async (dispatch) => {

  let _leave = { ...leave };
  _leave.startDate = format(_leave.startDate, 'yyyy-MM-dd');
  _leave.endDate = format(_leave.endDate, 'yyyy-MM-dd');
  const response = await leaveapi.post(`/leaves`, _leave);
  //make dates related changes
  const obj = response.data;
  obj.startDate = new Date(obj.startDate);
  obj.endDate = new Date(obj.endDate);
  dispatch({ type: ActionTypes.SAVE_LEAVE, payload: obj });
  // dispatch(fetchLeave(obj.id));
};

//To approve leave
export const approveLeaveAction = (leave) => async (dispatch) => {

  const response = await leaveapi.post(`/leaves/approve`, leave);
  //make dates related changes
  const obj = response.data;
  obj.startDate = new Date(obj.startDate);
  obj.endDate = new Date(obj.endDate);
  dispatch({ type: ActionTypes.APPROVE_LEAVE, payload: obj });
};


//To reject leave
export const rejectLeaveAction = (leave) => async (dispatch) => {
  const response = await leaveapi.post(`/leaves/reject`, leave);
  //make dates related changes
  const obj = response.data;
  obj.startDate = new Date(obj.startDate);
  obj.endDate = new Date(obj.endDate);
  dispatch({ type: ActionTypes.REJECT_LEAVE, payload: obj });
};

//To fetch author details leave
export const updateAuthorDetails = (leave, authorName) => async (dispatch) => {
  const response = await leaveapi.get(`/leaves/authordetails/${authorName}`);
  //update author details
  leave.author.commonName = authorName;
  leave.employementType = response.data.workType;
  leave.office = response.data.officeCode;
  leave.division = response.data.divisionCode;
  leave.department = response.data.departmentCode;
  dispatch({ type: ActionTypes.FETCH_AUTHOR_DETAILS, payload: leave });
};

//To fetch author details leave
export const fetchAndUpdateTotalLeaveCount = (leave) => async (dispatch) => {
  const response = await leaveapi.get(`/leaves/leavecount/${leave.startDate}/${leave.endDate}`);
  //update leave count
  leave.totalLeaveCount = response.data;
  dispatch({ type: ActionTypes.FETCH_TOTAL_LEAVE_COUNT, payload: leave });
};

export const setLeaves = (leaves) => {
  return {
    type: ActionTypes.SET_LEAVES,
    payload: leaves,
  };
};

export const selectedLeave = (leave) => {
  return {
    type: ActionTypes.SELECTED_LEAVE,
    payload: leave,
  };
};

export const setSelectedLeaveLog = (log) => {
  return {
    type: ActionTypes.SET_SELECTED_LEAVE_LOG,
    payload: log
  };
};