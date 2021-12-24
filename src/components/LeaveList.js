import React, { useRef, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLeaves, fetchLeaves }  from '../components/redux/actions/leaveActions';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { format } from "date-fns";
import { Link, NavLink } from 'react-router-dom'
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
const LeavePage = () => {
  const toast = useRef(null);
  const dt = useRef(null);
  const leaves = useSelector((state) => state.allLeaves.leaves);
  const dispatch = useDispatch();
  const cols = [
    { field: 'author.commonName', header: 'Author' },
    { field: 'leaveNo', header: 'Leave No' }
];

  const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));
  useEffect(() => {
    //below method is to add data into redux store
     dispatch(fetchLeaves());
  }, []);

  const changeStartDateFormat = (rowData) => {
    return format(new Date(rowData.startDate), 'yyyy-MM-dd');
  }
  const changeEndDateFormat = (rowData) => {
    return format(new Date(rowData.endDate), 'yyyy-MM-dd');
  }

  const leaveLinkTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Link to={`/leavedetail/${rowData.id}`} >{rowData.author.commonName}</Link>
      </React.Fragment>
    );
  }

  const leftToolbarTemplate = () => {
    return (
      <Link to={`/leavedetail/0`}>
        <Button label="New Leave" icon="pi pi-plus" className="p-button-success p-mr-2" ></Button>
      </Link>

    );
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>

        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeletion(rowData)} />
      </React.Fragment>
    );
  }
  //to delete leave
  const confirmDeletion = (leave) => {
    confirmDialog({
      message: 'Do you want to delete this leave?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => deleteLeave(leave),
      reject
    });

  }
  const deleteLeave = (leave) => {
    axios.delete(`http://localhost:9080/api/leaves/${leave.id}`)
      .then(res => {
        // to reload all the updated leaves
        window.location.reload();
      }).catch(error => {
        this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
      })
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'The leave has been deleted', life: 3000 });
  }
  const reject = () => {
    toast.current.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }
  const rigthToolbarTemplate = () => {
    return (
        <div className="p-d-flex p-ai-center export-buttons">
            <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV}></Button>
            {/* <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning p-mr-2" data-pr-tooltip="PDF" /> */}
        </div>
    );
}
   //export related functions

   const exportCSV = () => {
    dt.current.exportCSV();
}

const exportPdf = () => {
    import('jspdf').then(jsPDF => {
        import('jspdf-autotable').then(() => {
            const doc = new jsPDF.default(0, 0);
            doc.autoTable(exportColumns, leaves);
            doc.save('leaves.pdf');
        })
    })
}

  return (
    <Card>

      <Toast ref={toast} />
      <div >
        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rigthToolbarTemplate}></Toolbar>

        <DataTable header="Leaves with redux" value={leaves} ref={dt} className="p-datatable-responsive-demo" dataKey="id"
          resizableColumns columnResizeMode="expand" reorderableColumns emptyMessage="No leaves found in redux."
          paginator rows={10} rowsPerPageOptions={[5, 10, 25]} showGridlines>
          <Column field="author.commonName" body={leaveLinkTemplate} header="Author" sortable filter></Column>
          <Column field="leaveNo" header="Leave No" sortable filter style={{ textAlign: "center" }}></Column>
          <Column field="leaveType" header="Leave Type" sortable filter filterMatchMode="contains"></Column>
          <Column header="First day of leave" body={changeStartDateFormat} style={{ textAlign: "center" }} sortable filter></Column>
          <Column body={changeEndDateFormat} header="Last day of leave" style={{ textAlign: "center" }} sortable filter></Column>
          <Column field="totalLeaveCount" header="Days approved" style={{ textAlign: "center" }} sortable filter></Column>
          <Column field="comments" header="Details" sortable filter filterMatchMode="contains"></Column>
          <Column field="status" header="Deciding" style={{ textAlign: "center" }} sortable filter></Column>
          <Column field="approver.commonName" header="Approver" sortable filter></Column>
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>


    </Card>
  );
};

export default LeavePage;
