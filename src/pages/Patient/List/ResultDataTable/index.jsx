import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { json, useNavigate } from "react-router-dom";
import api from "utils/api";
import useAuth from "hooks/useAuth";

export var record = [];

export default function ResultDataTable() {
  const { loading, isLogin, user } = useAuth();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (loading) return;

    if (isLogin) {
      if (user.roles[0].id === 1) {
        navigate("/doctor");
      } else {
        api("assoc-record", "GET")
          .then((res) => {
            if (res.missions.length !== 0) {
              let missions = res.missions;
              record.length = 0;
              for (let i = 0; i < missions.length; i++) {
                let temp = missions[i].records;
                for (let j = 0; j < temp.length; j++) {
                  temp[j]["times"] = "第" + (i + 1) + "次";
                  record.push(temp[j]);
                }
              }
              dataProcess();
              setRecords(record);
            }
          })
          .catch((e) => {
            console.log(e);
            alert(e.message);
          });
      }
    } else {
      navigate("/login");
    }
  }, [isLogin, loading]);

  function dataProcess() {
    for (let i = 0; i < record.length; i++) {
      if (record[i].result != null) {
        let temp = JSON.parse(record[i].result);
        // let temp = (record[i].result).split(",");
        // let left = temp[0].replace(/[^0-9]/ig,"");
        // let right = temp[1].replace(/[^0-9]/ig,"");
        record[i].result =
          "左:" + (temp.left || "0") + "\n右:" + (temp.right || "0");
      }
    }
  }

  const [filters, setFilters] = useState({
    global: {
      value: "",
      matchMode: FilterMatchMode.CONTAINS,
    },
    category: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    shoot_time: {
      value: null,
      matchMode: "date-filter",
    },
    record_time: {
      value: null,
      matchMode: "date-filter",
    },
    status: {
      value: null,
      matchMode: FilterMatchMode.EQUALS,
    },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const category = ["手部抓握", "手指捏握", "手掌翻面", "抬腳"];

  const statuses = ["已檢閱", "待檢閱", "未處理", "未上傳"];

  const filterClearTemplate = (options) => {
    return (
      <Button
        type="button"
        onClick={options.filterClearCallback}
        className="p-button-secondary p-button-text"
      >
        取消
      </Button>
    );
  };

  const filterApplyTemplate = (options) => {
    return (
      <Button type="button" onClick={options.filterApplyCallback}>
        篩選
      </Button>
    );
  };

  const categoryFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={category}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        placeholder="選擇檢測項目"
        className="p-column-filter"
        showClear
      />
    );
  };

  const shootDateBodyTemplate = (rowData) => {
    if (rowData.media.length)
      return formatDate(new Date(rowData.media[0].created_at));
    else return "未上傳";
  };

  const recordDateBodyTemplate = (rowData) => {
    if (rowData.record_time) return formatDate(new Date(rowData.record_time));
    else return "未上傳";
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

  const formatDate = (value) => {
    return value
      ? value.toLocaleDateString("zh-TW", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : "N/A";
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`category-result status-${rowData.status}`}>
        {rowData.status}
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
        placeholder="選擇狀態"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option) => {
    return <span className={`category-result status-${option}`}>{option}</span>;
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

  const header = renderHeader();

  return (
    <DataTable
      value={records}
      emptyMessage="無對應資料"
      filters={filters}
      header={header}
    >
      <Column field="times" header="任務次數" sortable />
      <Column
        field="category"
        header="檢測項目"
        sortable
        filter
        filterApply={filterApplyTemplate}
        filterClear={filterClearTemplate}
        filterElement={categoryFilterTemplate}
        showFilterMenuOptions={false}
        showAddButton={false}
        filterMenuStyle={{ width: "14rem" }}
      />
      <Column
        field="record_time"
        header="拍攝時間"
        dataType="date"
        body={recordDateBodyTemplate}
        sortable
        filter
        filterApply={filterApplyTemplate}
        filterClear={filterClearTemplate}
        filterElement={dateFilterTemplate}
        showFilterMenuOptions={false}
        showAddButton={false}
      />
      <Column
        field="shoot_time"
        header="上傳時間"
        dataType="date"
        body={shootDateBodyTemplate}
        sortable
        filter
        filterApply={filterApplyTemplate}
        filterClear={filterClearTemplate}
        filterElement={dateFilterTemplate}
        showFilterMenuOptions={false}
        showAddButton={false}
      />
      <Column field="location" header="地點" sortable />
      <Column field="result" header="次數" />
      <Column
        field="status"
        header="狀態"
        body={statusBodyTemplate}
        sortable
        filter
        filterApply={filterApplyTemplate}
        filterClear={filterClearTemplate}
        filterElement={statusFilterTemplate}
        showFilterMenuOptions={false}
        showAddButton={false}
        filterMenuStyle={{ width: "14rem" }}
      />
      <Column field="doctor_comment" header="醫師回饋" />
    </DataTable>
  );
}
