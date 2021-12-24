import { ActionTypes } from "../constants/action-types"

const initialState = {
  leaves: [
    {
      id: null,
      leaveType: '',
      employementType: '',
      office: '',
      division: '',
      department: '',
      details: '',
      comments: '',
      status: 'DRAFT',
      author: {
        commonName: ""
      },
      approver: {
        commonName: ""
      },
      officeManager: {
        commonName: ""
      },
      startDate: new Date(),
      endDate: new Date(),
      totalLeaveCount: 1
    }

  ]
}

export const leaveReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_LEAVES:
      return { ...state, leaves: payload };
    case ActionTypes.FETCH_LEAVES:
      return { ...state, leaves: payload };
    case ActionTypes.REMOVE_SELECTED_LEAVE:
      return { ...state, leaves: payload };
    case ActionTypes.SUBMIT_LEAVE:
      return { ...state, leaves: payload };
    case ActionTypes.APPROVE_LEAVE:
      return { ...state, leaves: payload };
    case ActionTypes.REJECT_LEAVE:
      return { ...state, leaves: payload };
    case ActionTypes.UPDATE_LEAVE:
      return { ...state, leaves: payload };
    default:
      return state;
  }
};


export const selectedLeaveReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_LEAVE:
      return { ...state, ...payload };
    case ActionTypes.SELECTED_LEAVE:
      return { ...state, ...payload };
    case ActionTypes.FETCH_AUTHOR_DETAILS:
      return { ...state, ...payload };
      case ActionTypes.FETCH_TOTAL_LEAVE_COUNT:
        return { ...state, ...payload };
    default:
      return state;
  }
};

export const leaveTypesReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_LEAVE_TYPES:
      return { ...state, leaveTypes: payload };
    default:
      return state;
  }
};

export const empTypesReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_EMP_TYPES:
      return { ...state, empTypes: payload };
    default:
      return state;
  }
};

export const selectedLeaveHistroy = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_SELECTED_LEAVE_HISTORY:
      return { ...state, history: payload };
    default:
      return state;
  }
};
export const selectedLeaveLog = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SELECTED_LEAVE_LOG:
      return { ...state, ...payload };
    default:
      return state;
  }
};