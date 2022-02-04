import React, { useEffect } from "react";
import { connect } from "react-redux";
import DmsSettingsForm from "./DmsSettingsForm";
import _ from "underscore";

import {
  editDmsSetting,
  fetchDmsSettingsById,
} from "../redux/actions/DMS_Settings_Actions";
const DmsSettingsEditForm = (props) => {
  console.log("props", props);

  useEffect(() => {
    props.fetchDmsSettingsById(props.match.params.dmsappSettingId);
  }, []);
  const onSubmit = (formValues) => {
    props.editDmsSetting(props.match.params.dmsappSettingId, formValues);
    console.log("formValues", formValues);
    // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Updated Application Successfully', life: 3000 });
  };
  return (
    <div>
      <h2>Settings Edit Form</h2>
      <DmsSettingsForm
        initialValues={_.pick(
          props.setting,
          "dmsappSettingId",
          "dmsappId",
          "dmssettingCode",
          "dmssettingDescription",
          "dmssettingType",
          "dmssettingValue",
          "dmssettingStatus",
          "createdByUserId",
          "creationDate",
          "lastupdatedByUserId",
          "lastupdatedDate",
          "isActive"
        )}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log("editstate", state);
  // console.log('editownProps', ownProps);

  return { setting: state.dmsSettingById.dmsSettingInitialState };
};

export default connect(mapStateToProps, {
  fetchDmsSettingsById,
  editDmsSetting,
})(DmsSettingsEditForm);
