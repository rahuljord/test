import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedLeave, fetchLeave, fetchLeaveTypes, fetchEmpTypes, fetchSelectedLeaveHistory,
  submitLeaveAction, approveLeaveAction, rejectLeaveAction, updateLeaveAction, updateAuthorDetails, fetchAndUpdateTotalLeaveCount
} from "./redux/actions/leaveActions";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { format } from "date-fns";
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useHistory } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';

const LeaveComponent = () => {
  const { leaveId } = useParams();
  let history = useHistory();
  //A hook to access the redux store's state. 
  let leave = useSelector((state) => state.leave);
  const leaveTypes = useSelector((state) => state.leaveTypes.leaveTypes);
  const empNames = useSelector((state) => state.empTypes.empTypes);
  const recentLeaves = useSelector((state) => state.leaveHistory.history);
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);
  const [leaveDateValidation, setLeaveDateValidation] = useState(false);
  const [editable, setEditable] = useState(false);
  const [approvalRejectionCommentDialog, setApprovalRejectionCommentDialog] = useState(false);
  const toast = useRef(null);
  const [leaveAction,setLeaveAction]=useState('');
  //declasre empty leave object
  let emptyLeave = {
    id: null,
    leaveType: '',
    employementType: '',
    office: '',
    division: '',
    department: '',
    details: '',
    comments: '',
    status: 'DRAFT',
    author: {
      commonName: ""
    },
    approver: {
      commonName: ""
    },
    officeManager: {
      commonName: ""
    },
    startDate: new Date(),
    endDate: new Date(),
    totalLeaveCount: 1
  };

  //like page load method
  useEffect(() => {
    dispatch(fetchLeaveTypes());
    dispatch(fetchEmpTypes());

    if (leaveId == 0) {
      setEditable(true);
      dispatch(selectedLeave(emptyLeave));
    } else {
      dispatch(fetchLeave(leaveId));
      dispatch(fetchSelectedLeaveHistory(leaveId));

    }

  }, [leaveId]);

  const logDateFormat = (rowData) => {
    return format(new Date(rowData.dateTime), 'yyyy-MM-dd HH:mm:ss');
  }


  const submitLeave = () => {
    setSubmitted(true);
    if (leave.author.commonName.length > 0 && leave.leaveType.length > 0 && leave.totalLeaveCount !== '') {

      let _leave = { ...leave };
      _leave.startDate = format(_leave.startDate, 'yyyy-MM-dd');
      _leave.endDate = format(_leave.endDate, 'yyyy-MM-dd');
      dispatch(submitLeaveAction(leave));
      setEditable(false);
      toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'The leave has been submitted', life: 3000 });
      history.push("/leavelist");
    }
  }
  const approveLeave = () => {
    setSubmitted(true);
    if (leave.author.commonName.length > 0 && leave.leaveType.length > 0 && leave.totalLeaveCount != '') {

      let _leave = { ...leave };
      _leave.startDate = format(_leave.startDate, 'yyyy-MM-dd');
      _leave.endDate = format(_leave.endDate, 'yyyy-MM-dd');
      dispatch(approveLeaveAction(_leave));
      setEditable(false);
      history.push("/leavelist");
    }
  }
  const rejectLeave = () => {
    setSubmitted(true);

    if (leave.author.commonName.length > 0 && leave.leaveType.length > 0 && leave.totalLeaveCount != '') {

      let _leave = { ...leave };
      _leave.startDate = format(_leave.startDate, 'yyyy-MM-dd');
      _leave.endDate = format(_leave.endDate, 'yyyy-MM-dd');
      dispatch(rejectLeaveAction(_leave));
      setEditable(false);
      history.push("/leavelist");
    }
  }

  const updateLeave = () => {
    setSubmitted(true);
    if (leave.author.commonName.length > 0 && leave.leaveType.length > 0 && leave.totalLeaveCount != '') {

      dispatch(updateLeaveAction(leave));
      toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'The leave has been saved', life: 3000 });
      history.push('/leavelist');
    }
  }
  const onAuthorChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _leave = { ...leave };
    _leave.author.commonName = val;
    dispatch(updateAuthorDetails(_leave, val));
  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _leave = { ...leave };
    _leave[`${name}`] = val;
    dispatch(selectedLeave(_leave));
  }

  const setTotalLeaveCount = (e, name) => {
    //first update the dates into state objects
    const val = (e.target && e.target.value) || '';

    let _leave = { ...leave };
    _leave[`${name}`] = val;
    const { isAfter } = require("date-fns");

    if ((format(_leave.startDate, 'yyyy-MM-dd') == format(_leave.endDate, 'yyyy-MM-dd')) || isAfter(new Date(_leave.endDate), new Date(_leave.startDate))) {
      dispatch(fetchAndUpdateTotalLeaveCount(_leave));
      setSubmitted(false);
      setLeaveDateValidation(false);
    } else {
      setSubmitted(true);
      setLeaveDateValidation(true);
    }
  }
  //dialog related
  const hideDialog = () => {
    setSubmitted(false);
    setApprovalRejectionCommentDialog(false);
  }

  const showDialog = () => {
    setSubmitted(false);
    setApprovalRejectionCommentDialog(true);
  };
  const dialogFooter = (
    <div>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text"></Button>
      <Button label="Save" icon="pi pi-check" className="p-button-text" />
    </div>

  );

  return (
    <div >
      {Object.keys(leave).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="p-grid">
          <Toast ref={toast}></Toast>
          <div className="p-col-12 p-md-6">

            <div className="card">
              {!editable && leave.status == 'SUBMITTED' && <Button label="Edit" className="p-button-info p-mr-2 p-mb-2" onClick={() => setEditable(true)} />}
              {editable && leave.status == 'SUBMITTED' && <Button label='Update' className="p-button-info p-mr-2 p-mb-2" onClick={updateLeave} />}
              {leave.status == 'DRAFT' && <Button label="Submit" className="p-button-info p-mr-2 p-mb-2" onClick={submitLeave} />}
              {leave.status == 'SUBMITTED' && <Button label="Approve" onClick={showDialog} className="p-button-success p-mr-2 p-mb-2" />}
              {leave.status == 'SUBMITTED' && <Button label="Reject" className="p-button-danger p-mr-2 p-mb-2" onClick={showDialog} />}
            </div>

            <div className="card p-fluid">


              <div className="p-field p-grid">
                <label htmlFor="Approver" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0"> Author <span style={{ color: "red" }}> *</span></label>
                <div className="p-col-12 p-md-10">
                  {editable ? <Dropdown options={empNames} value={leave.author.commonName} optionLabel="commonName"
                    optionValue="commonName" placeholder="Select author" required
                    onChange={(e) => onAuthorChange(e, 'author.commonName')} /> : <Dropdown disabled options={empNames} value={leave.author.commonName} optionLabel="commonName"
                      optionValue="commonName" placeholder="Select author" required
                      onChange={(e) => onAuthorChange(e, 'author.commonName')} />}

                  {leave.author.commonName && <small >
                    {leave.employementType} - {leave.office} - {leave.division} - {leave.department}

                  </small>}
                  {submitted && !leave.author.commonName && <small className="p-error">Author  Required.</small>}
                </div>
              </div>
              {leave.id != null &&
                <div className="p-field p-grid">
                  <label htmlFor="Approver" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Approver</label>
                  <div className="p-col-12 p-md-10">
                    <label>{leave.approver.commonName}</label>
                  </div>
                </div>

              }

              <div className="p-field p-grid">
                <label htmlFor="Approver" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0"> Leave Type <span style={{ color: "red" }}> *</span></label>
                <div className="p-col-12 p-md-10">
                  {editable ? <Dropdown options={leaveTypes} value={leave.leaveType}
                    required onChange={(e) => onInputChange(e, 'leaveType')}></Dropdown> : <Dropdown disabled options={leaveTypes} value={leave.leaveType}
                      required onChange={(e) => onInputChange(e, 'leaveType')}></Dropdown>}
                  {submitted && !leave.leaveType && <small className="p-error">Leave Type  Required.</small>}
                </div>
              </div>


              <div className="p-field p-grid">
                <label htmlFor="first" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0"> First day of leave <span style={{ color: "red" }}> *</span></label>
                <div className="p-col-12 p-md-10">
                  {editable ? <Calendar id="icon" showIcon value={leave.startDate} dateFormat="dd/mm/yy" onChange={(e) => setTotalLeaveCount(e, 'startDate')} />
                    : <Calendar disabled id="icon" showIcon value={leave.startDate} dateFormat="dd/mm/yy" onChange={(e) => setTotalLeaveCount(e, 'startDate')} />}
                </div>
              </div>

              <div className="p-field p-grid">
                <label htmlFor="Approver" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0">  Last day of leave <span style={{ color: "red" }}> *</span></label>
                <div className="p-col-12 p-md-10">
                  {editable ? <Calendar id="icon" showIcon value={leave.endDate} dateFormat="dd/mm/yy" required onChange={(e) => setTotalLeaveCount(e, 'endDate')} />
                    : <Calendar disabled id="icon" showIcon value={leave.endDate} dateFormat="dd/mm/yy" required onChange={(e) => setTotalLeaveCount(e, 'endDate')} />}
                  {submitted && leaveDateValidation && leave.endDate && <small className='p-error'> Last day of leave must be greater than First day of leave </small>}
                </div>
              </div>


              <div className="p-field p-grid">
                <label htmlFor="Approver" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0">  Total no of leave days <span style={{ color: "red" }}> *</span></label>
                <div className="p-col-12 p-md-10">
                  {editable ? <InputText value={leave.totalLeaveCount} required onChange={(e) => onInputChange(e, 'totalLeaveCount')}></InputText> :
                    <InputText disabled value={leave.totalLeaveCount} required onChange={(e) => onInputChange(e, 'totalLeaveCount')}></InputText>}
                  {submitted && !leave.totalLeaveCount && <small className="p-error">Total no of leave days required.</small>}

                </div>
              </div>


              <div className="p-field p-grid">
                <label htmlFor="Approver" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0"> Comments</label>
                <div className="p-col-12 p-md-10">
                  {editable ? <InputTextarea value={leave.comments} onChange={(e) => onInputChange(e, 'comments')} rows={5} cols={30} autoResize /> :
                    <InputTextarea disabled value={leave.comments} onChange={(e) => onInputChange(e, 'comments')} rows={5} cols={30} autoResize />}

                </div>
              </div>

            </div>
            <Dialog visible={approvalRejectionCommentDialog} footer={dialogFooter} style={{ width: '900px' }} header="Approve/Reject" modal className="p-fluid" onHide={hideDialog}>

              <div className="p-field p-grid">
                <label htmlFor="Approver" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0"> Comments</label>
                <div className="p-col-12 p-md-10">
                  <InputText id="name" />
                </div>
              </div>
            </Dialog>

          </div>

          {leaveId != 0 && <div className="p-col-12 p-md-6">
            <div className="card p-fluid">

              <DataTable value={recentLeaves} className="p-datatable-responsive-demo" dataKey="id"
                resizableColumns columnResizeMode="expand" reorderableColumns emptyMessage="No leaves found."
                paginator rows={10} rowsPerPageOptions={[5, 10, 25]} showGridlines header="Leave History">
                <Column field="leaveNo" header="Leave No" style={{ textAlign: "center" }} sortable filter></Column>
                <Column field="leaveType" header="Leave Type" sortable filter filterMatchMode="contains"></Column>
                <Column field="startDate" header="First day of leave" sortable filter></Column>
                <Column field="endDate" header="Last day of leave" sortable filter></Column>
                <Column field="totalLeaveCount" header="Days approved" style={{ textAlign: "center" }} sortable filter></Column>
                <Column field="status" header="Deciding" sortable filter></Column>
                <Column field="approver.commonName" header="Approver" sortable filter></Column>
                <Column field="approvedDate" header="Approved Date" sortable filter></Column>
              </DataTable>
            </div>

            <div className="card p-fluid">
              <DataTable value={leave.history} className="p-datatable-responsive-demo" dataKey="id"
                resizableColumns columnResizeMode="expand" reorderableColumns emptyMessage="No logs found."
                paginator rows={10} rowsPerPageOptions={[5, 10, 25]} showGridlines header="Leave Log">
                <Column field="dateTime" body={logDateFormat} header="Date" sortable filter></Column>
                <Column field="userCommonName" header="Author" sortable filter></Column>
                <Column field="verb" header="Verb" sortable filter></Column>
                <Column field="details" header="Leave Type" sortable filter filterMatchMode="contains"></Column>

              </DataTable>
            </div>
          </div>
          }
        </div>

      )}

    </div>

  );
};

export default LeaveComponent;
