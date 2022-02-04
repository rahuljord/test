import { combineReducers } from "redux";
import {
  dmsApplicationEditReducer,
  dmsApplicationFetchReducer,
  dmsDivisonIdReducer,
  dmsSuiteIdReducer,
  dmsApplicationEditByIdReducer,
} from "./DMS_Application_Reducer";

import {dmsSettingsGetReducer, dmsSettingsGetByIdReducer,dmsSettingsGetByAppIdReducer} from './DMS_Settings_Reducers'

//assign variable name to reducer so that we can access it inside component using this variable name
const reducers = combineReducers({
  //     Application related reducers
  divisonId: dmsDivisonIdReducer,
  suiteId: dmsSuiteIdReducer,
  dmsApplications: dmsApplicationFetchReducer,
  editApplication: dmsApplicationEditReducer,
  editApplicationById: dmsApplicationEditByIdReducer,
  // settings related reducers
  dmsSettings : dmsSettingsGetReducer,
  dmsSettingById : dmsSettingsGetByIdReducer,
  dmsSettingByAppId : dmsSettingsGetByAppIdReducer
});

export default reducers;
