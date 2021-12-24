import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
function Home() {

  const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = [
        { name: 'code_11', code: 'code_11' },
        { name: 'code_22', code: 'code_22' },
        { name: 'code_33', code: 'code_33' }
    ];

  const [dropdownItem1, setDropdownItem1] = useState(null);
    const dropdownItems1 = [
        { name: '00000', code: '00000' },
        { name: '11111', code: '11111' },
        { name: '22222', code: '22222' }
    ];
    

    return (
      <div className="p-grid">
       <div className="p-col-12">
                <div className="card">
                    <h5>DMS Form</h5>
                    <div className="p-fluid p-formgrid p-grid">
                        {/* <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="DMSAppid">DMSAppid</label>
                            <InputText id="DMSAppid" type="number" value={`0`} />
                        </div> */}
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="DMSAppName">DMSAppName</label>
                            <InputText id="DMSAppName" type="text"  value={`IT_DEV`} />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="DMSAppDivisionID">DMSAppDivisionID</label>
                            <Dropdown id="DMSAppDivisionID" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        {/* <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="CreatedByUserID">CreatedByUserID</label>
                            <InputText id="CreatedByUserID" type="number" value={`2016520`} />
                        </div> */}
                        {/* <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="CreationDate">CreationDate</label>
                            <InputText id="CreationDate" type="datetime-local" />

                        </div> */}
                        {/* <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="LastupdatedByUserID">LastupdatedByUserID</label>
                            <InputText id="LastupdatedByUserID" type="number" value={`123545`}/>
                        </div> */}
                        {/* <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="LastupdatedDate">LastupdatedDate</label>
                            <InputText id="LastupdatedDate" type="datetime-local"  />
                        </div> */}
                        {/* <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="IsActive">IsActive</label>
                            <InputText id="IsActive" type="text" value={`1`} />
                        </div> */}
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="SuiteID">SuiteID</label>
                            <Dropdown id="SuiteID" value={dropdownItem1} onChange={(e) => setDropdownItem1(e.value)} options={dropdownItems1} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
}

export default Home
