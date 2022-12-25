import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function Table({ patients }) {
    const [selectedPatients, setSelectedPatients] = useState(null);
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });

    function checkList(patient_id) {
        let pathname = '/doctor/each/' + patient_id.toString();
        navigate(pathname);
    }

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const formatDate = (value) => {
        return new Date(value).toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }
    const formatTime = (value) => {
        return value
            ? new Date(value).toLocaleDateString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })
            : "N/A";
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
        let missions_count = rowData.missions.length;
        if (missions_count == 0) {
            return "N/A";
        }
        return formatTime(rowData.missions[missions_count - 1]["created_at"]);
    }
    const lastUploadBodyTemplate = (rowData) => {
        let missions_count = rowData.missions.length;
        if (missions_count == 0) {
            return "N/A";
        }
        return formatTime(rowData.missions[missions_count - 1]["latest_video_uploaded_at"]);
    }
    const progressBodyTemplate = (rowData) => {
        let missions_count = rowData.missions.length;
        if (missions_count == 0) {
            return "N/A";
        }
        let total = rowData.missions[missions_count - 1]["all_records"];
        let completed = rowData.missions[missions_count - 1]["uploaded_records"];
        return <ProgressBar value={Math.round((completed * 100) / total)} displayValueTemplate={displayValueTemplate} ></ProgressBar>;
    }
    const actionBodyTemplate = (rowData) => {
        return <Button label="檢視" onClick={() => { checkList(rowData.id); }} style={{ background: '#f8f9fa', color: 'rgb(82, 79, 79)', border: '0px' }} className='button-check'></Button>;
    }
    function customSort(event) {
        let data = [...patients];
        data.sort((data1, data2) => {
            let l1 = data1.missions.length;
            let l2 = data2.missions.length;
            let value1 = null;
            let value2 = null;

            if (l1 != 0) {
                value1 = data1.missions[l1 - 1][event.field];
                console.log(value1)
            }
            else if (l2 != 0) {
                value2 = data2.missions[l2 - 1][event.field];
            }

            let result = null;
            

            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2, undefined, { numeric: true });
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (event.order * result);
        });

        return data;
    }

    const header = renderHeader();

    return (
        <div className="datatable-doc-demo">
            <div className="card">
                <DataTable value={patients} className="p-datatable-customers" header={header}
                    dataKey="id" rowHover selection={selectedPatients} onSelectionChange={e => setSelectedPatients(e.value)}
                    filters={filters} responsiveLayout="scroll"
                    globalFilterFields={['name']} emptyMessage="沒有任何患者資料">
                    <Column field="name" header="姓名" sortable style={{ minWidth: '14rem' }} body={nameBodyTemplate} />
                    <Column field="created_at" header="上次指派任務時間" sortable sortFunction={customSort} dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate} />
                    <Column field="latest_video_uploaded_at" header="最新影片上傳時間" sortable sortFunction={customSort} dataType="date" style={{ minWidth: '14rem' }} body={lastUploadBodyTemplate} />
                    <Column field="uploaded_records" header="完成進度" sortable sortFunction={customSort} style={{ minWidth: '10rem' }} body={progressBodyTemplate} />
                    <Column headerStyle={{ width: '10rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>

    );

}