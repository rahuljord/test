import React, { useEffect, useRef, useState } from "react";
import { Form, Field } from "react-final-form";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import _ from "underscore";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import {
  fetchDivisionId,
  fetchDmsApplicationLists,
  fetchSuiteId,
} from "../redux/actions/DMS_Application_Actions";
import { useDispatch, useSelector } from "react-redux";
import history from "../../history";


const DmsForm = (props) => {
	const history = useHistory();
  const toast = useRef(null);

  // const history = useHistory();
  // console.log("dmsformprops", props);

  const dispatch = useDispatch();
  let divisionApi = useSelector((state) => state.divisonId.DMSAppDivisionID);
  let SuiteApi = useSelector((state) => state.suiteId.suiteList);
  //  console.log(`document`, SuiteApi)
  const fetchDmsList = useSelector(
    (state) => state.dmsApplications.dmsApplicationInitialState
  );
  useEffect(() => {
    dispatch(fetchDivisionId());
    dispatch(fetchSuiteId());
    dispatch(fetchDmsApplicationLists(fetchDmsList));
  }, []);

  const divisonFilter = _.map(divisionApi, function (item) {
    // console.log('divisonFilter', item)
    return { label: item.name, value: item.divisionId };
  });
  // const divisonFilter = _.map(divisionApi, function (item) {
  //   let divsionIdChanger = { ...item };
  //   if (item.name === "Corporate") {
  //     divsionIdChanger.code = "1";
  //   }
  //   if (item.name === "Dry Cooling") {
  //     divsionIdChanger.code = "2";
  //   }
  //   if (item.name === "IT") {
  //     divsionIdChanger.code = "3";
  //   }
  //   if (item.name === "Operations") {
  //     divsionIdChanger.code = "4";
  //   }
  //   if (item.name === "Human Resources") {
  //     divsionIdChanger.code = "5";
  //   }

  //   // console.log('divisonFilter', item)
  //   return { label: item.name, value: divsionIdChanger.code };
  // });

  const suiteFilter = _.map(SuiteApi, function (item) {
    // console.log('SuiteApi', SuiteApi);
    return { label: item.suitename, value: item.suiteid };
  });

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
        <InputText  className={className} {...input} autoComplete="off" />
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

  const DropdownDivison = ({ input, label, ...rest }) => {
    // console.log("input", input);
    return (
      <div>
        <label>{label}</label>

        <Dropdown {...input} {...rest} />
      </div>
    );
  };
  const DropdownSuite = ({ input, label, ...rest }) => {
    return (
      <div>
        <label>{label}</label>

        <Dropdown {...input} {...rest} />
      </div>
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'The leave has been submitted', life: 3000 });
    
    history.push("/dms_list");
  };
  // const divFunc = () => {
  //   const sampleTest = { ...props };
  //   // console.log('sampleTest', sampleTest.dmsDivId.dmsappDivisionId);
  //   if (props.dmsDivId) {
  //     return (
  //       <Field
  //         name="dmsappDivisionId"
  //         component={DropdownDivison}
  //         options={divisonFilter}
  //         placeholder="Select Divison"
  //         label="Division"
  //         defaultValue={sampleTest.dmsDivId.dmsappDivisionId}
  //       />
  //     );
  //   }
  //   if (!props.dmsDivId) {
  //     return (
  //       <Field
  //         name="dmsappDivisionId"
  //         component={DropdownDivison}
  //         options={divisonFilter}
  //         placeholder="Select Divison"
  //         label="Division"
  //         defaultValue={""}
  //       />
  //     );
  //   }
  // };

  // console.log("testprops", props.dmsDivId.dmsappDivisionId);
  // const divFunc = () => {
  //   return (
  //     <div>
  //       {props.dmsDivId.dmsappDivisionId ? (
  //         <Field
  //           name="dmsappDivisionId"
  //           component={DropdownDivison}
  //           options={divisonFilter}
  //           placeholder="Select Divison"
  //           label="Division"
  //           defaultValue={props.dmsDivId.dmsappDivisionId}
  //         />
  //       ) : (
  //         <Field
  //           name="dmsappDivisionId"
  //           component={DropdownDivison}
  //           options={divisonFilter}
  //           placeholder="Select Divison"
  //           label="Division"
  //           defaultValue={" "}
  //         />
  //       )}
  //     </div>
  //   );
  // };
  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validate={(formValues) => {
        const errors = {};

        if (!formValues.dmsappName) {
          errors.dmsappName = "You must enter a name";
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
                <h5>DMS Forms</h5>

                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      name="dmsappName"
                      component={renderInput}
                      label="DMS Application Name"
                    />
                  </div>
                </div>
                <div
                  className="p-fluid p-formgrid p-grid"
                  style={{ display: "none" }}
                >
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      initialValue={0}
                      name="dmsappid"
                      component={renderHiddenInput}
                      label="dmsAppID"
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
                <div
                  className="p-fluid p-formgrid p-grid"
                  style={{ display: "none" }}
                >
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      initialValue={null}
                      name="divisionName"
                      component={renderHiddenInput}
                      label="division Name"
                    />
                  </div>
                </div>
                <div
                  className="p-fluid p-formgrid p-grid"
                  style={{ display: "none" }}
                >
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      initialValue={null}
                      name="divisionsList"
                      component={renderHiddenInput}
                      label="divisions List"
                    />
                  </div>
                </div>
                <div
                  className="p-fluid p-formgrid p-grid"
                  style={{ display: "none" }}
                >
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      initialValue={null}
                      name="suiteName"
                      component={renderHiddenInput}
                      label="suite Name"
                    />
                  </div>
                </div>
                <div
                  className="p-fluid p-formgrid p-grid"
                  style={{ display: "none" }}
                >
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      initialValue={null}
                      name="suitesList"
                      component={renderHiddenInput}
                      label="suites List"
                    />
                  </div>
                </div>

                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      name="dmsappDivisionId"
                      component={DropdownDivison}
                      options={divisonFilter}
                      placeholder="Select Divison"
                      label="Division"
                      defaultValue={"2"}
                    />
                    {/* {divFunc()} */}
                  </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6">
                    <Field
                      name="suiteId"
                      component={DropdownSuite}
                      options={suiteFilter}
                      placeholder="Select Suite"
                      label="Suite"
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

export default DmsForm;
