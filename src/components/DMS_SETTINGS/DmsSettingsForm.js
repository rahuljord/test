import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import moment from "moment";
import { Button } from "primereact/button";
import { Link, useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { fetchDmsSettingsById, fetchDmsSettingsLists } from "../redux/actions/DMS_Settings_Actions";

const DmsSettingsForm = (props) => {
    const dispatch = useDispatch();
    const settingState = useSelector((state) => state)
    // console.log('settingState', settingState);
    useEffect(() =>{
        // dispatch(fetchDmsSettingsLists())
        // dispatch(fetchDmsSettingsById())
    })
  const history = useHistory();
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    // console.log('meta', meta);
    const className = `${meta.error && meta.touched ? "p-invalid" : ""}`;
    return (
      <div className={className}>
        {/* <div className={`p-invalid`}> */}
        <label>{label}</label>
        <InputText className={className} {...input} autoComplete="off" />
        {/* {renderError(meta)} */}
      </div>
    );
  };
  const renderHiddenInput = ({ input, label, meta }) => {
    const className = `${meta.error && meta.touched ? "p-invalid" : ""}`;

    return (
      <div className={className}>
        {/* <label>{label}</label> */}
        <InputText type="hidden" {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };
  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
    console.log('formValues', formValues);
    // toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'The leave has been submitted', life: 3000 });

    // history.push("/dms_list");
  };
  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validate={(formValues) => {
        const errors = {};

        if (!formValues.dmssettingCode) {
          errors.dmssettingCode = "You must enter a name";
        }

        return errors;
      }}
      render={({ handleSubmit }) => (
        <div className="p-grid">
          <div className="p-col-12">
            <form onSubmit={handleSubmit} className="ui form error">
              <div className="card">
                {/* <Link to={`/dms_list`}> */}
                <Button
                  label="Save"
                  icon="pi pi-save"
                  className="p-mr-2 p-mb-2"
                  type="submit"
                ></Button>
                {/* </Link> */}

                <Link to={`/dms_list`}>
                  <Button
                    label="Cancel"
                    icon="pi pi-times"
                    className="p-button-danger p-mr-2 p-mb-2"
                  ></Button>
                </Link>
                <h5>DMS Settings</h5>

             
                <div
                  className="p-fluid p-formgrid p-grid"
                  style={{ display: "none" }}
                >
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      initialValue={0}
                      name="dmsappSettingId"
                      component={renderHiddenInput}
                      label="dms App Setting Id"
                    />
                  </div>
                </div>
                <div
                  className="p-fluid p-formgrid p-grid"
                  style={{ display: "none" }}
                >
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      initialValue={1}
                      name="dmsappId"
                      component={renderHiddenInput}
                      label="dms App Id"
                    />
                  </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      name="dmssettingCode"
                      component={renderInput}
                      label="Code"
                    />
                  </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      name="dmssettingDescription"
                      component={renderInput}
                      label="Description"
                    />
                  </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      name="dmssettingType"
                      component={renderInput}
                      label="Type"
                    />
                  </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      name="dmssettingValue"
                      component={renderInput}
                      label="Value"
                    />
                  </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6" 
                   style={{ display: "none" }}
                  >
                    <Field
                     initialValue={""}
                      name="dmssettingStatus"
                      component={renderHiddenInput}
                      label="dms setting Status"
                    />
                  </div>
                </div>
                <div
                  className="p-fluid p-formgrid p-grid"
                  style={{ display: "none" }}
                >
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      initialValue={1}
                      name="createdByUserId"
                      component={renderHiddenInput}
                      label="created By User Id"
                    />
                  </div>
                </div>
                <div
                  className="p-fluid p-formgrid p-grid"
                  style={{ display: "none" }}
                >
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      initialValue={moment(Date().toLocaleString()).format()}
                      name="creationDate"
                      component={renderHiddenInput}
                      label="creation Date"
                    />
                  </div>
                </div>
                <div
                  className="p-fluid p-formgrid p-grid"
                  style={{ display: "none" }}
                >
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      initialValue={1}
                      name="lastupdatedByUserId"
                      component={renderHiddenInput}
                      label="last updated By User Id"
                    />
                  </div>
                </div>
                <div
                  className="p-fluid p-formgrid p-grid"
                  style={{ display: "none" }}
                >
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      initialValue={moment(Date().toLocaleString()).format()}
                      name="lastupdatedDate"
                      component={renderHiddenInput}
                      label="last updated Date"
                    />
                  </div>
                </div>
                <div
                  className="p-fluid p-formgrid p-grid"
                  style={{ display: "none" }}
                >
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      initialValue={true}
                      name="isActive"
                      component={renderHiddenInput}
                      label="Is Active"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    />
  );
};

export default DmsSettingsForm;
