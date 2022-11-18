import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Slider } from "primereact/slider";

const exams = [
  {
    exam: "手指拍打",
    date: new Date(2022, 11, 10),
    result: "(左手)20次 (右手)19次",
    status: 3,
    feedback: "未發現異常",
  },
  {
    exam: "手指拍打",
    date: new Date(2022, 11, 12),
    result: "",
    status: 1,
    feedback: "",
  },
  {
    exam: "手指拍打",
    date: new Date(2022, 11, 18),
    result: "(左手)20次 (右手)19次",
    status: 2,
    feedback: "",
  },
  {
    exam: "手指拍打",
    date: new Date(),
    result: "",
    status: 0,
    feedback: "",
  },
];

const matchModes = [{ label: "包含", value: FilterMatchMode.CONTAINS }];

export default function ExamDataTable() {
  // const [exams, setCustomers] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    date: {
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    lastUpload: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [loading, setLoading] = useState(true);

  const statuses = ["待檢測", "未處裡", "待檢閱", "已檢閱"];

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
  };

  const formatDate = (value) => {
    return value.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>檢測紀錄</h3>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="關鍵字搜尋"
          />
        </span>
      </div>
    );
  };

  const resultTemp = ({ result }) => {
    return <React.Fragment>{result}</React.Fragment>;
  };

  const examBodyTemplate = ({ exam }) => {
    return exam;
  };

  const timeBodyTemplate = ({ date }) => {
    return formatDate(date);
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="yy/mm/dd"
        placeholder="年/月/日"
        mask="9999/99/99"
      />
    );
  };

  const statusBodyTemplate = ({ status }) => {
    const bgcolors = ["#CFCFCF", "#FFD8B2", "#B3E5FC", "#C8E6C9"];
    const colors = ["#6F6F6F", "#805B36", "#23547B", "#346C37"];
    return (
      <span
        style={{
          backgroundColor: bgcolors[status],
          color: colors[status],
          padding: "5px",
        }}
        className={`customer-badge`}
      >
        {statuses[status]}
      </span>
    );
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select a Status"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const feedbackBodyTemplate = (rowData) => {
    return rowData.feedback;
  };

  const header = renderHeader();

  return (
    <div className="datatable-doc-demo">
      <div className="card">
        <DataTable
          value={exams}
          header={header}
          rows={10}
          dataKey="id"
          rowHover
          filters={filters}
          filterDisplay="menu"
          loading={!loading}
          responsiveLayout="scroll"
          globalFilterFields={["name"]}
          emptyMessage="尚未有完成的檢測"
        >
          <Column
            field="name"
            header="檢測項目"
            sortable
            filter
            body={examBodyTemplate}
            filterPlaceholder="篩選檢測項目"
            filterMatchModeOptions={matchModes}
          />
          <Column
            field="date"
            header="上傳時間"
            sortable
            filterField="date"
            body={timeBodyTemplate}
            filter
            filterElement={dateFilterTemplate}
            filterPlaceholder="篩選時間"
          />
          <Column field="result" header="次數" body={resultTemp} />

          <Column
            field="status"
            header="狀態"
            sortable
            body={statusBodyTemplate}
            filter
            filterElement={statusFilterTemplate}
          />
          <Column
            field="feedback"
            header="醫師回饋"
            body={feedbackBodyTemplate}
          />
        </DataTable>
      </div>
    </div>
  );
}
