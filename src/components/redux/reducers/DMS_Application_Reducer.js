import { ActionTypes } from "../constants/DMS_Application_Action_Types";
import dmsApplicationModels from "../../../models/dmsApplicationModels";
// import dmsApplicationModels from "../../../models/dmsApplicationModels"
const initialState = {
  dmsApplicationList: [
    {
      dmsappid: 1,
      dmsappName: "HR DMS APPLICATION",
      dmsappDivisionId: 1,
      createdByUserId: 1,
      creationDate: "2021-01-04T08:00:00Z",
      lastupdatedByUserId: 1,
      lastupdatedDate: "2021-01-04T08:00:00Z",
      isActive: true,
      suiteId: 1,
    },
  ],
  divisonsList: [
    { code: "New York", name: "NY" },
    { code: "Rome", name: "RM" },
    { code: "London", name: "LDN" },
    { code: "Istanbul", name: "IST" },
    { code: "Paris", name: "PRS" },
  ],
  suiteList: [
    { code: "New York", name: "NY" },
    { code: "Rome", name: "RM" },
    { code: "London", name: "LDN" },
    { code: "Istanbul", name: "IST" },
    { code: "Paris", name: "PRS" },
  ],
  dmsappDivisions: [
    {
      DMSAppDivisionID: null,
      DMSAppDivisionName: "",
    },
  ],
  suiteList: [
    {
      SuiteID: null,
      SuiteName: "",
    },
  ],
};

const DMSAppDivisionID = [
  {
    code: "DC",
    name: "Dry Cooling",
  },
  {
    code: "IT",
    name: "IT",
  },
];
const suiteList = [
  {
    code: "1",
    name: "JORD",
  },
  {
    code: "2",
    name: "JOGS",
  },
];
const dmsApplicationInitialState = [
  {
    dmsappid: 21,
    dmsappName: "dmstesthahsvaga",
    dmsappDivisionId: 1,
    createdByUserId: 1,
    creationDate: "0001-01-02T16:01:40.613773+05:30",
    lastupdatedByUserId: 1,
    lastupdatedDate: "0001-01-02T16:01:40.613773+05:30",
    isActive: true,
    suiteId: 2,
    divisionName: null,
    divisionsList: null,
    suiteName: null,
    suitesList: null,
  },
];

export const selectedDmsApplicationReducer = (
  state = {},
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.FETCH_DMS_APPLICATION:
      return { ...state, ...payload };
    case ActionTypes.SELECTED_DMS_APPLICATION:
      return { ...state, ...payload };
    // case ActionTypes.FETCH_AUTHOR_DETAILS:
    //   return { ...state, ...payload };
    //   case ActionTypes.FETCH_TOTAL_LEAVE_COUNT:
    //     return { ...state, ...payload };
    default:
      return state;
  }
};

export const dmsDivisonIdReducer = (
  state = DMSAppDivisionID,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.GET_DIVISION_DROPDOWN:
      return { ...state, DMSAppDivisionID: payload };
    default:
      return state;
  }
};
export const dmsSuiteIdReducer = (state = suiteList, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_SUITE_DROPDOWN:
      return { ...state, suiteList: payload };
    default:
      return state;
  }
};

export const dmsApplicationFetchReducer = (
  state = dmsApplicationInitialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.FETCH_DMS_APPLICATIONS:
      return { ...state, dmsApplicationInitialState: payload };
    default:
      return state;
  }
};

export const dmsApplicationEditReducer = (
  state = dmsApplicationInitialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.EDIT_DMS_APPLICATION:
      return { ...state, dmsApplicationInitialState: payload };
    default:
      return state;
  }
};

export const dmsApplicationEditByIdReducer = (
  state = dmsApplicationInitialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.FETCH_DMS_APPLICATION_BY_ID:
      return { ...state, dmsApplicationInitialState: payload };
    default:
      return state;
  }
};
