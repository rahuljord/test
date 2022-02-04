import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Link} from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { connect, useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";

import {
  fetchDmsApplicationLists,
  fetchDmsApplicationById,
  deleteDmsApplication,
} from "../redux/actions/DMS_Application_Actions";
import { fetchDmsSettingsByAppId } from '../redux/actions/DMS_Settings_Actions'
import { Dialog } from "primereact/dialog";

const DmsFormList = (props) => {
  console.log("LISTprops", props);
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [deleteApplication, setDeleteApplication] = useState(null);

  const [customer1, setCustomer1] = useState(null);
  const [selectedCustomers1, setSelectedCustomers1] = useState(null);
  const [globalFilter1, setGlobalFilter1] = useState("");
  const [loading1, setLoading1] = useState(true);
  const toast = useRef(null);

  const dispatch = useDispatch();

  const fetchDmsList = useSelector(
    (state) => state.dmsApplications.dmsApplicationInitialState
  );
  useEffect(() => {
    dispatch(fetchDmsApplicationLists(fetchDmsList));
  }, []);
  const leftToolbarTemplate = () => {
    return (
      <Link to={`/dms_new`}>
        <Button
          label="New Application"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
        ></Button>
      </Link>
    );
  };
  const confirmationDialogFooter = () => (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialogBox}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteButtonAction}
      />
    </>
  );
  const hideDialogBox = () => {
    setDisplayConfirmation(false);
  };

  const deleteIcon = (data) => {
    setDisplayConfirmation(true);
    setDeleteApplication(data);
  };

  const deleteButtonAction = () => {
    const appId = deleteApplication.dmsappid;
    // console.log('appId', appId);
    props.deleteDmsApplication(appId);
    setDisplayConfirmation(false);
    toast.current.show({
      severity: "error",
      summary: "Successful",
      detail: "Application Deleted",
      life: 3000,
    });
  };
  const renderContent = () => {
    return <>Are you sure you want to delete ?</>;
  };
  // const dmsSettingByApp = (data) => {
  //   const dmsAppId = data.dmsappid;
  //   // console.log('dmsAppId', dmsAppId);
  //   props.fetchDmsSettingsByAppId(dmsAppId);
  

  // }
  const DmsAppBody = (data) => {
    return (
      <>
        <span className="p-column-title">DMS Application Name</span>
        <span
          style={{ marginLeft: ".5em", verticalAlign: "middle" }}
          className="image-text"
        >
          {data.dmsappName}
        </span>
      </>
    );
  };
  const divisionBody = (data) => {
    return (
      <>
        <span className="p-column-title">Division</span>
        <span
          style={{ marginLeft: ".5em", verticalAlign: "middle" }}
          className="image-text"
        >
          {data.divisionName}
        </span>
      </>
    );
  };

  const suiteBody = (data) => {
    return (
      <>
        <span className="p-column-title">Suite</span>
        <span
          style={{ marginLeft: ".5em", verticalAlign: "middle" }}
          className="image-text"
        >
          {data.suiteName}
        </span>
      </>
    );
  };

  const userAction = (data) => {
    return (
      <div className="actions">
        <Link to={`/dms_edit/${data.dmsappid}`}>
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-mr-2"
          />
        </Link>
        <Button
          onClick={() => deleteIcon(data)}
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning p-mr-2"
        />
        <Link to={`/DmsSettingsListByAppId/${data.dmsappid}`}>
        {/* <Link to={`#`}> */}
          <Button
          // onClick={() => dmsSettingByApp(data)}
            icon="pi pi-cog"
            className="p-button-rounded p-button-data"
          />
        </Link>
      </div>
    );
  };
  return (
    <div className="p-grid table-demo">
      <div className="p-col-12">
        <div className="card">
          <Toast ref={toast} />

          <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
          <DataTable
            value={fetchDmsList}
            paginator
            className="p-datatable-customers"
            rows={10}
            dataKey="id"
            rowHover
            selection={selectedCustomers1}
            onSelectionChange={(e) => setSelectedCustomers1(e.value)}
            globalFilter={globalFilter1}
            emptyMessage="No customers found."
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3em" }}
            ></Column>
            <Column
              field="DMS Application Name"
              header="DMS Application Name"
              sortable
              body={DmsAppBody}
            ></Column>
            <Column
              field="Divison"
              header="Divison"
              sortable
              body={divisionBody}
            ></Column>
            <Column
              field="Suite"
              header="Suite"
              sortable
              body={suiteBody}
            ></Column>
            <Column body={userAction}></Column>
          </DataTable>
          <Dialog
            header="Confirmation"
            visible={displayConfirmation}
            onHide={() => setDisplayConfirmation(false)}
            style={{ width: "450px" }}
            modal
            footer={confirmationDialogFooter}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle p-mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>{renderContent()}</span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  // console.log("stateDelete", state.dmsApplications.dmsApplicationInitialState);
  // console.log("DeleteownProps", ownProps);
  // console.log("checkLog", state.editApplicationById.dmsApplicationInitialState);
  return {
    application: state.dmsApplications.dmsApplicationInitialState,
  };
};
export default connect(mapStateToProps, {
  fetchDmsApplicationById,
  deleteDmsApplication,
  fetchDmsSettingsByAppId
})(DmsFormList);
