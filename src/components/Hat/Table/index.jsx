import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { Slider } from 'primereact/slider';
import { PatientService } from '../PatientService'
import moment from "moment";

export default function Table({ title }) {
    const [patients, setPatients] = useState(null);
    const [selectedPatients, setSelectedPatients] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'lastUpload': {operator: FilterOperator.AND, constraints: [{ value:null, matchMode:FilterMatchMode.DATE_IS }] }, 
        'activity': { value: null, matchMode: FilterMatchMode.BETWEEN }
    });
    
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    const patientService = new PatientService();

    useEffect(() => {
        patientService.getPatientsLarge().then(data => { setPatients(getPatients(data)); setLoading(false) });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getPatients = (data) => {
        return [...data || []].map(d => {
            d.date = new Date(d.date);
            return d;
        });
    }

    const formatDate = (value) => {
        return value.toLocaleDateString({
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
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
            <div className="flex justify-content-between align-items-center">
                <p style={{ font_size:'5px' }}>病患資料</p>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="關鍵字搜尋" />
                </span>
            </div>
        )
    }
    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    }
    const lastUploadBodyTemplate = (rowData) => {
        return formatTime(rowData.lastUpload);
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="yy/mm/dd" placeholder="yyyy/mm/dd" mask="99/99/9999" />
    }

    const activityBodyTemplate = (rowData) => {
        return <ProgressBar value={rowData.activity} color='#4FC0FF'displayValueTemplate={displayValueTemplate}></ProgressBar>;
    }


    const activityFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3"></Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </React.Fragment>
        )
    }

    const actionBodyTemplate = () => {
        return <Button label="檢視結果" className='button-test'></Button>;
    }

    const header = renderHeader();

    return(
        <div className="datatable-doc-demo">
            <div className="card">
                <DataTable value={patients} style={{padding: '10px' }} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="id" rowHover selection={selectedPatients} onSelectionChange={e => setSelectedPatients(e.value)}
                    filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                    globalFilterFields={['name']} emptyMessage="沒有任何患者資料"
                    currentPageReportTemplate="顯示 {first} 到 {last} (共 {totalRecords} 項) ">
                    <Column field="name" header="姓名" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                    <Column field="date" header="上次就診日期" sortable filterField="date" dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate}
                        filter filterElement={dateFilterTemplate} />
                    <Column field="date" header="最新影片上傳時間" sortable filterField="date" dataType="date" style={{ minWidth: '14rem' }} body={lastUploadBodyTemplate}
                        filter filterElement={dateFilterTemplate} />
                    <Column field="activity" header="完成進度" sortable showFilterMatchModes={false} style={{ minWidth: '10rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} />
                    <Column headerStyle={{ width: '10rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>

    );
    
}