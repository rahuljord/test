import React, { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchDmsApplicationById } from "../redux/actions/DMS_Application_Actions";
import DmsForm from "./DmsForm";
import { editDmsApplication } from "../redux/actions/DMS_Application_Actions";
import _ from "underscore";
import { Toast } from 'primereact/toast';


const DmsEdit = (props) => {
  const dispatch = useDispatch();
  const toast = useRef(null);


  // const editlist = useSelector((state) => state);
  console.log("propsedit", props);

  useEffect(() => {
    props.fetchDmsApplicationById(props.match.params.dmsappid);
  }, []);
  const onSubmit = (formValues) => {
    props.editDmsApplication(props.match.params.dmsappid, formValues);
    console.log("formValues", formValues);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Updated Application Successfully', life: 3000 });

  };
  // console.log('pickup', _.pick(props.application, 'dmsapName', 'dmsappDivisionId', 'suteid', 'createdByUserId', 'lastupdatedByUserId','dmsappid','creationDate','lastupdatedDate','isActive'))


  
  return (
    <div>
      <h2>Dms Edit</h2>
      <Toast ref={toast}></Toast>

      <DmsForm
        initialValues={_.pick(
          props.application,
          "dmsappName",
          "dmsappDivisionId",
          "suiteId",
          "createdByUserId",
          "lastupdatedByUserId",
          "dmsappid",
          "creationDate",
          "lastupdatedDate",
          "isActive"
        )}
        onSubmit={onSubmit}
        dmsDivId={_.pick(props.application, "dmsappDivisionId")}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log('editstate', state);
  // console.log('editownProps', ownProps);

  return { application: state.editApplicationById.dmsApplicationInitialState };
};

export default connect(mapStateToProps, {
  fetchDmsApplicationById,
  editDmsApplication,
})(DmsEdit);
