import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SettingsService from "../../service/DmsSettingsService";
import { connect, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { Link} from "react-router-dom";
import { fetchDmsSettingsByAppId, fetchDmsSettingsById, fetchDmsSettingsLists } from "../redux/actions/DMS_Settings_Actions";

const DmsSettingsListByAppId = (props) => {
  console.log('settingListByAppIdProps', props);
  const [settingData, setSettingData] = useState(null);
  const dispatch = useDispatch();

  // const dmsSettingById = useSelector((state) => state.dmsSettings.dmsSettingInitialState);
  const dmsSettingByAppId = useSelector((state) => state.dmsSettingByAppId.dmsSettingInitialState);
  const stateTest = useSelector(state => state)
  console.log('stateTest', stateTest);
  useEffect(() => {
    // dispatch(fetchDmsSettingsLists(dmsSettingById))
    props.fetchDmsSettingsByAppId(props.match.params.dmsappSettingAppId)
    // const settingsService = new SettingsService();
    // settingsService.getSettings().then((data) => setSettingData(data));
  }, []);

  const NameTemplate = (data) => {
    
    return (
      <>
        <span className="p-column-title">Name</span>
        <span className="image-text" >{data.dmssettingCode}</span>
      </>
    );
  };
  const DescriptionTemplate = (data) => {
    return (
      <>
        <span className="p-column-title">Description</span>
        <span className="image-text">{data.dmssettingDescription}</span>
      </>
    );
  };
  const CategoryTemplate = (data) => {
    return (
      <>
        <span className="p-column-title">Category</span>
        <span className="image-text">{data.dmssettingType}</span>
      </>
    );
  };
  const ValueTemplate = (data) => {
    return (
      <>
        <span className="p-column-title">Value</span>
        <span className="image-text">{data.dmssettingValue}</span>
      </>
    );
  };
  const StatusTemplate = (data) => {
    return (
      <>
        <span className="p-column-title">Status</span>
        <span className="image-text">{data.dmssettingStatus}</span>
      </>
    );
  };
  const headerRowGroup = (data) => {
    return (
      <>
        {/* <img alt={data.representative.name} src={`assets/demo/images/avatar/${data.representative.image}`} width="32" style={{ verticalAlign: 'middle' }} />
            <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }} className="image-text">{data.representative.name}</span> */}
        <span>hai</span>
      </>
    );
  };
  const footerRowGroup = (data) => {
    return (
      <>
        {/* <img alt={data.representative.name} src={`assets/demo/images/avatar/${data.representative.image}`} width="32" style={{ verticalAlign: 'middle' }} />
            <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }} className="image-text">{data.representative.name}</span> */}
        <span>hai</span>
      </>
    );
  };
  const userAction = (data) => {
    return (
      <div className="actions">
        <Link to={`/DmsSettingsEdit/${data.dmsappSettingId}`}>
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-mr-2"
          />
        </Link>
        <Button
          // onClick={() => deleteIcon(data)}
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning p-mr-2"
        />
       
      </div>
    );
  };

  return (
    <div className="p-grid table-demo">
      <div className="p-col-12">
        <div className="card" id="settings_id">
          <h5>DMS SETTINGS LIST </h5>
          <DataTable
          style={{
              tableLayout: 'fixed'
          }}
            value={dmsSettingByAppId}
            rowGroupMode="subheader"
            className="p-datatable-customers"
            groupField="representative.name"
            sortMode="single"
            sortField="representative.name"
            sortOrder={1}
            rowGroupHeaderTemplate={headerRowGroup}
            rowGroupFooterTemplate={footerRowGroup}
          >
            <Column  field="name" header="Name" body={NameTemplate}></Column>
            <Column
              field="Description"
              header="Description"
              body={DescriptionTemplate}
            ></Column>
            <Column
              field="Category"
              header="Category"
              body={CategoryTemplate}
            ></Column>
            <Column field="Value" header="Value" body={ValueTemplate}></Column>
            <Column field="Status" header="Status" body={StatusTemplate}></Column>
            <Column header="Actions" body={userAction}></Column>
       
          </DataTable>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => {
  // console.log('editstate', state);
  // console.log('editownProps', ownProps);

  return { setting: state.dmsSettingByAppId.dmsSettingInitialState };
};

export default connect(mapStateToProps,{ fetchDmsSettingsByAppId})(DmsSettingsListByAppId);
