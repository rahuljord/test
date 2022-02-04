import { SettingsActionTypes } from "../constants/DMS_Settings_Action_Types";

const dmsSettingInitialState = [
    {
        dmsappSettingId: 1111,
        dmsappId: 11,
        dmssettingCode: "ActionItem_Categories",
        dmssettingDescription: "Categories to be assigned to Action Items",
        dmssettingType: "Action Items",
        dmssettingValue: "",
        dmssettingStatus: "",
        createdByUserId: 1,
        creationDate: "0001-01-02T12:01:52.613003+05:30",
        lastupdatedByUserId: 1,
        lastupdatedDate: "0001-01-02T12:01:52.613005+05:30",
        isActive: null
}
]


export const dmsSettingsGetReducer = (state = dmsSettingInitialState, { type, payload}) => {
switch(type){
    case SettingsActionTypes.GET_DMSSETTINGS:
        return {...state, dmsSettingInitialState : payload}
        default:
            return state;
}
};
export const dmsSettingsGetByAppIdReducer = (state = dmsSettingInitialState, { type, payload}) => {
switch(type){
    case SettingsActionTypes.GET_DMSSETTINGS_BY_APP_ID:
        return {...state, dmsSettingInitialState : payload}
        default:
            return state;
}
};
export const dmsSettingsGetByIdReducer = (state = dmsSettingInitialState, { type, payload}) => {
switch(type){
    case SettingsActionTypes.GET_DMSSETTINGS_BY_ID:
        return {...state, dmsSettingInitialState : payload}
        default:
            return state;
}
};
export const dmsSettingsUpdateReducer = (state = dmsSettingInitialState, { type, payload}) => {
switch(type){
    case SettingsActionTypes.UPDATE_DMSSETTINGS:
        return {...state, dmsSettingInitialState : payload}
        default:
            return state;
}
};
export const dmsSettingsDeleteReducer = (state = dmsSettingInitialState, { type, payload}) => {
switch(type){
    case SettingsActionTypes.DELETE_DMSSETTINGS:
        return {...state, dmsSettingInitialState : payload}
        default:
            return state;
}
};
