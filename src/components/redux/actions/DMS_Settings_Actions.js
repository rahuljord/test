import DMSServices from "../../../apis/DMSServices"
import { SettingsActionTypes } from "../constants/DMS_Settings_Action_Types"

export const fetchDmsSettingsLists = () => async (dispatch) =>  {
    const response = await DMSServices.get(`/DMSAppSettings/GetDmsappSettings`)
    // console.log('2', response.data);
    dispatch({ type : SettingsActionTypes.GET_DMSSETTINGS, payload: response.data})
}
export const fetchDmsSettingsByAppId = (dmsappSettingId) => async (dispatch) =>  {
    const response = await DMSServices.get(`/DMSAppSettings/GetDmsappSettings?DMSAppID=${dmsappSettingId}`)
    // const response = await DMSServices.get(`/DMSAppSettings/GetDmsappSettings?DMSAppID=64`)
    // console.log('2', response.data);
    dispatch({ type : SettingsActionTypes.GET_DMSSETTINGS_BY_APP_ID, payload: response.data})
}


export const fetchDmsSettingsById = (dmsappSettingId) => async (dispatch) => {
    // console.log('first', dmsappSettingId);
    const response = await DMSServices.get(`/DMSAppSettings/GetDmsappSetting/${dmsappSettingId}?DmsappSettingId=${dmsappSettingId}`)
    // const response = await DMSServices.get(`/DMSAppSettings/GetDmsappSetting/2000?DmsappSettingId=2000`)
//    console.log('response', response.data);
    dispatch({type : SettingsActionTypes.GET_DMSSETTINGS_BY_ID, payload : response.data})
}

export const editDmsSetting = (dmsappSettingId, formValues) => async (dispatch) => {
    // console.log('edit dms console', dmsappSettingId, formValues);
    const response = await DMSServices.put(`/DMSAppSettings/PutDmsappSetting/${dmsappSettingId}?DmsappSettingId=${dmsappSettingId}`, formValues)
dispatch({ type : SettingsActionTypes.UPDATE_DMSSETTINGS, payload: response.data})
}

export const deleteDmsSetting = (dmsappSettingId) => async (dispatch) => {
    await DMSServices.delete(`/DMSAppSettings/DeleteDmsappSetting/${dmsappSettingId}?DmsappSettingId=${dmsappSettingId}`)
    dispatch({ type : SettingsActionTypes.DELETE_DMSSETTINGS, payload: dmsappSettingId})
}