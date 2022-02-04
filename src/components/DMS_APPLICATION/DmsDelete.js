import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// import history from "../../history";
import Modal from "../Modal";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import {
  fetchDmsApplicationById,
  deleteDmsApplication,
  fetchDmsApplicationLists,
} from "../redux/actions/DMS_Application_Actions";
import { createLogger } from "redux-logger";

const DmsDelete = (props) => {
  let history = useHistory();
  function handleClick() {
    history.push("/dms_list");
  }
  const [displayConfirmation, setDisplayConfirmation] = useState(true);
  const dispatch = useDispatch();

  console.log("deleteProps", props);
  useEffect(() => {
    // dispatch(fetchDmsApplicationLists());

    props.fetchDmsApplicationById(props.match.params.dmsappid);
  }, []);

  const deleteButtonAction = () => {
    const appId = props.match.params.dmsappid;
    // console.log("dmsappid ", appId);
    props.deleteDmsApplication(appId);
    setDisplayConfirmation(false);
    // handleClick()
  };

  const noButtonAction = () => {
    setDisplayConfirmation(false);
    handleClick();
  };

  const renderContent = () => {
    if (!props.application) {
      return `Are you sure you want to delete `;
    }
    return (
      <>
        Are you sure you want to delete <b>{props.application.dmsappName}</b>?
      </>
    );
  };

  const confirmationDialogFooter = (
    <>
      {/* <Button type="button" label="No" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} className="p-button-text" /> */}
      <Link
        type="button"
        label="Yes"
        icon="pi pi-check"
        onClick={noButtonAction}
        className="p-button-text p-4"
      >
        No {`    `}
      </Link>
      <Link
        type="button"
        label="Yes"
        icon="pi pi-check"
        onClick={deleteButtonAction}
        className="p-button-text"
        autoFocus
      >
        Yes
      </Link>
    </>
  );
  console.log("retunr props testing", props);
  return (
    <div className="card p-fluid">
      <h5>Confirmation</h5>
      {/* <Button label="Delete" icon="pi pi-trash" className="p-button-danger" style={{ width: '50%' }} onClick={() => setDisplayConfirmation(true)} /> */}
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
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log("stateDelete", state);
  // console.log("DeleteownProps", ownProps);
  // console.log("checkLog", state.editApplicationById.dmsApplicationInitialState);
  return {
    application: state.editApplicationById.dmsApplicationInitialState,
  };
};

export default connect(mapStateToProps, {
  fetchDmsApplicationById,
  deleteDmsApplication,
})(DmsDelete);
