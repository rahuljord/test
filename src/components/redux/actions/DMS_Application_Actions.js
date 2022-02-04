// import axios from "axios"
import { ActionTypes } from "../constants/DMS_Application_Action_Types"
import GlobalServices from "../../../apis/GlobalServices"
import DMSServices from "../../../apis/DMSServices"
import history from "../../../history"

// this is for divisions dropdown
export const fetchDivisionId = () => async (dispatch) =>{
    const response = await GlobalServices.get(`/Divisions/GetDivisionsForDropdown`)
dispatch({ type : ActionTypes.GET_DIVISION_DROPDOWN, payload : response.data})
}

// this is for suites dropdown
export const fetchSuiteId = () => async (dispatch) =>{
    const response = await GlobalServices.get(`/JordSuites/GetJordSuitesForDropdown`)
    dispatch({ type : ActionTypes.GET_SUITE_DROPDOWN, payload : response.data})
    
}

// this is for creating the dms application

export const createDmsApplication = (formValues) =>  async (dispatch) => {
    console.log('formValues', formValues);
const response =  await DMSServices.post('/DMSApplication/PostDmsapplication', formValues)
dispatch({ type : ActionTypes.CREATE_DMS_APPLICATION, payload: response.data })
history.push('/dms_list')
}


// this is for fetcting the list
export const fetchDmsApplicationLists = () => async (dispatch) =>{
    const response = await DMSServices.get(`/DMSApplication/GetDmsapplications`)
    // console.log(response);
   dispatch({ type : ActionTypes.FETCH_DMS_APPLICATIONS, payload : response.data})
}

// this is for fetcting the list by ID {single record}
export const fetchDmsApplicationById = (dmsappid) => async (dispatch) =>{
    const response = await DMSServices.get(`/DMSApplication/GetDmsapplication/${dmsappid}?DMSAppid=${dmsappid}`)
    // const response = await DMSServices.get(`/DMSApplication/GetDmsapplication/33?DMSAppid=33`)
// console.log('2', response.data) 

    dispatch({ type : ActionTypes.FETCH_DMS_APPLICATION_BY_ID, payload : response.data})
}
//this is for edit dms application
export const editDmsApplication = (dmsappid, formValues) => async dispatch => {
//   console.log('first',   formValues);
      const response  = await DMSServices.put(`/DMSApplication/PutDmsapplication/${dmsappid}?DMSAppid=${dmsappid}`, formValues)
    //   const response  = await DMSServices.put(`/DMSApplication/PutDmsapplication/24?DMSAppid=24`)
    // console.log('2', response);
    
dispatch({ type : ActionTypes.EDIT_DMS_APPLICATION , payload : response.data })
// dispatch({ type : ActionTypes.FETCH_DMS_APPLICATIONS, payload : response.data})
history.push('/dms_list');



}

// delete dms application
export const deleteDmsApplication = (dmsappid) => async dispatch => {
    await DMSServices.delete(`/DMSApplication/DeleteDmsapplication/${dmsappid}?DMSAppid=${dmsappid}`)
    dispatch({ type : ActionTypes.DELETE_DMS_APPLICATION , payload: dmsappid })
    history.push('/dms_list');

}


 