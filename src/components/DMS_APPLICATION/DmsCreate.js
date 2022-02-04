import React, { useRef } from "react";
import { connect } from "react-redux";
import { createDmsApplication } from "../redux/actions/DMS_Application_Actions";
import DmsForm from "./DmsForm";
import { Toast } from 'primereact/toast';


const DmsCreate = (props) => {
  const toast = useRef(null);

  const onSubmit = (formValues) => {
    // console.log('formValues1', props.createDmsApplication(formValues));
    console.log('formValues1', formValues);
    
    props.createDmsApplication(formValues);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Created New Application', life: 3000 });

  };
// console.log('propsCreate', props);

  return (
    <div>
      <h2>Create a Dms Application</h2>
      <Toast ref={toast}></Toast>

      <DmsForm onSubmit={onSubmit} />
    </div>
  );
};
export default connect(null, { createDmsApplication })(DmsCreate);
