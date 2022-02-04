import React from 'react';
import DmsSettingsForm from './DmsSettingsForm';

const DmsSettingsCreate = (props) => {
const onSubmit = (formValues) => {
    console.log('formValuesSETTINGSCREATE', formValues);
}


  return (<div>
      <DmsSettingsForm onSubmit={onSubmit} />
  </div>);
};

export default DmsSettingsCreate;
