import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import api from "utils/api";

export default function Table({ title }) {
    const [selectedPatients, setSelectedPatients] = useState(null);
    const [patients, setPatients] = useState({});
    const { user, isLogin, loading} = useAuth();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    
    function checkList(patient_id) {
        let pathname = '/doctor/each/' + patient_id.toString();
        navigate(pathname);
    }

    useEffect(() => {
        if (loading) return;
        if (isLogin){
          api("assoc-record", "GET")
          .then((json) => {
            setPatients(json.patients);
          })
          .catch((e) => {
            alert(e.message);
            navigate("/doctor");
          });
        }
        else{
          navigate("/login");
        }
      }, [isLogin, loading]);

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const datalist =
    [
        {
            "name": "James Butt",
            "date": "2015-09-13",
            "lastUpload":"2015-09-13 21:30", 
            "activity": 17
        },
        {
            "name": "Josephine Darakjy",
            "date": "2019-02-09",
            "lastUpload":"2019-02-09 21:30", 
            "activity": 0
        },
        {
            "name": "Brandon Callaro",
            "date": "2016-07-13",
            "lastUpload":"2016-07-13 21:30", 
            "activity": 55
        },
        {
            "name": "Scarlet Cartan",
            "date": "2018-09-13",
            "lastUpload":"2018-09-13 21:30", 
            "activity": 1
        }
    ];
    
    const formatDate = (value) => {
        return new Date(value).toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
    }
    const formatTime = (value) => {
        return moment(value).format("YYYY/MM/D, HH:mm");
    }
    const displayValueTemplate = (value) => {

        return (
            <React.Fragment>
                {value}%
            </React.Fragment>
        );
    }
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }
    const renderHeader = () => {
        return (
            <div style={{display: "flex",justifyContent: "space-between",alignItems: "center"}}>
                <h3 >病患資料</h3>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="關鍵字搜尋" />
                </span>
            </div>
        )
    }
    const nameBodyTemplate = (rowData) => {
        return (rowData.name);
    }
    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.updated_at);
    }
    const lastUploadBodyTemplate = (rowData) => {
        return formatTime(rowData["missions"][0]["updated_at"]);
    }
    const progressBodyTemplate = (rowData) => {
        return <ProgressBar value={rowData["missions"][0]["id"]} color='#4FC0FF' displayValueTemplate={displayValueTemplate} ></ProgressBar>;
    }  //just use id to represent the progress temporarily
    const actionBodyTemplate = (rowData) => {
        return <Button label="檢視" onClick={() => {checkList(rowData.id);}} style={{ background: '#f8f9fa', color: 'rgb(82, 79, 79)', border: '0px' }} className='button-check'></Button>;
    }

    const header = renderHeader();

    return(
        <div className="datatable-doc-demo">
            <div className="card">
                <DataTable value={patients} className="p-datatable-customers" header={header}
                    dataKey="id" rowHover selection={selectedPatients} onSelectionChange={e => setSelectedPatients(e.value)}
                    filters={filters} responsiveLayout="scroll"
                    globalFilterFields={['name']} emptyMessage="沒有任何患者資料">
                    <Column field="name" header="姓名" sortable style={{ minWidth: '14rem' }} body={nameBodyTemplate}/>
                    <Column field="updated_at" header="上次就診日期" sortable dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate}/>
                    <Column field="lastUpload" header="最新影片上傳時間" sortable dataType="date" style={{ minWidth: '14rem' }} body={lastUploadBodyTemplate} />
                    <Column field="activity" header="完成進度" sortable style={{ minWidth: '10rem' }} body={progressBodyTemplate} />
                    <Column headerStyle={{ width: '10rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>

    );
    
}