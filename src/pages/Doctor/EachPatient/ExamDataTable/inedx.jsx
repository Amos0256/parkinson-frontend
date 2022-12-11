import React, { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { getExamName } from "utils/getName";
import MissionDetailModal from "../MissionDetailModal";

const matchDateModes = [
  { label: "等於", value: FilterMatchMode.DATE_IS },
  { label: "不等於", value: FilterMatchMode.DATE_IS_NOT },
  { label: "早於", value: FilterMatchMode.DATE_BEFORE },
  { label: "晚於", value: FilterMatchMode.DATE_AFTER },
];

export default function ExamDataTable({ modifyRecords, loading, data }) {
  const [filters, setFilters] = useState({
    category: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    date: {
      value: null,
      matchMode: FilterMatchMode.DATE_IS,
    },
    status: {
      value: null,
      matchMode: FilterMatchMode.EQUALS,
    },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [missionDetailModalShow, setMissionDetailModalShow] = useState(false);
  const [detailRecord, setDetailRecord] = useState(null);

  const statuses = ["未上傳", "未處理", "待檢閱", "已檢閱"];

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
    try {
      const json = JSON.parse(result);
      return (
        <React.Fragment>
          左：{json.left}
          <br />
          右：{json.right}
        </React.Fragment>
      );
    } catch {
      return "";
    }
  };

  const MissionBodyTemplate = ({ mission_id }) => {
    if (!data) return "";
    const list = [];
    data.forEach((item) => {
      if (!list.includes(item.mission_id)) {
        list.push(item.mission_id);
      }
    });
    return <div>第{list.indexOf(mission_id) + 1}次</div>;
  };

  const examBodyTemplate = ({ category }) => {
    return category;
  };

  const createTimeBodyTemplate = ({ created_at }) => {
    if (created_at) return formatDate(new Date(created_at));
    else return "錯誤";
  };

  const uploadTimeBodyTemplate = ({ submit_time }) => {
    if (submit_time) return formatDate(new Date(submit_time));
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

  const statusBodyTemplate = ({ status }) => {
    const map = {
      未上傳: 0,
      未處理: 1,
      待檢閱: 2,
      已檢閱: 3,
    };
    const bgcolors = ["#CFCFCF", "#FFD8B2", "#B3E5FC", "#C8E6C9"];
    const colors = ["#6F6F6F", "#805B36", "#23547B", "#346C37"];
    return (
      <span
        style={{
          backgroundColor: bgcolors[map[status]],
          color: colors[map[status]],
          padding: "5px",
        }}
      >
        {status}
      </span>
    );
  };

  const statusItemTemplate = (option) => {
    return statusBodyTemplate({ status: option });
  };

  const categoryFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={["手部抓握", "手指捏握", "手掌翻面", "抬腳"]}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="選擇檢測項目"
        showClear
      />
    );
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="選擇檢測狀態"
        showClear
      />
    );
  };

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

  const feedbackBodyTemplate = ({ doctor_comment }) => {
    return doctor_comment;
  };

  const moreBodyTemplate = ({ status, id }) => {
    function open() {
      setMissionDetailModalShow(true);
      setDetailRecord(data.find((item) => item.id === id));
    }
    return (
      <Button
        disabled={!(status === "已檢閱" || status === "待檢閱")}
        onClick={open}
        icon={<i className="pi pi-arrow-right" />}
      />
    );
  };

  const header = renderHeader();

  return (
    <div className="datatable-doc-demo">
      <div className="card">
        <DataTable
          value={data}
          header={header}
          dataKey="id"
          rowHover
          filters={filters}
          filterDisplay="menu"
          loading={loading}
          responsiveLayout="scroll"
          globalFilterFields={["category"]}
          emptyMessage="尚未有完成的檢測"
        >
          <Column
            field="mission_id"
            header="任務次數"
            sortable
            body={MissionBodyTemplate}
          />
          <Column
            field="category"
            header="檢測項目"
            sortable
            filterField="category"
            body={examBodyTemplate}
            showFilterMatchModes={false}
            filter
            filterElement={categoryFilterTemplate}
            filterPlaceholder="篩選檢測項目"
            filterApply={filterApplyTemplate}
            filterClear={filterClearTemplate}
          />
          <Column
            field="created_at"
            header="指派時間"
            dataType="date"
            sortable
            filterField="date"
            body={createTimeBodyTemplate}
            filter
            filterElement={dateFilterTemplate}
            filterPlaceholder="篩選時間"
            filterMatchModeOptions={matchDateModes}
            filterApply={filterApplyTemplate}
            filterClear={filterClearTemplate}
          />
          <Column
            field="submit_time"
            header="上傳時間"
            dataType="date"
            sortable
            filterField="date"
            body={uploadTimeBodyTemplate}
            filter
            filterElement={dateFilterTemplate}
            filterPlaceholder="篩選時間"
            filterMatchModeOptions={matchDateModes}
            filterApply={filterApplyTemplate}
            filterClear={filterClearTemplate}
          />
          <Column field="result" header="次數" body={resultTemp} />
          <Column
            field="status"
            header="狀態"
            sortable
            body={statusBodyTemplate}
            filter
            filterElement={statusFilterTemplate}
            showFilterMatchModes={false}
            filterApply={filterApplyTemplate}
            filterClear={filterClearTemplate}
          />
          <Column
            field="feedback"
            header="醫師回饋"
            body={feedbackBodyTemplate}
          />
          <Column body={moreBodyTemplate} />
        </DataTable>
        <MissionDetailModal
          missionDetailModalShow={missionDetailModalShow}
          setMissionDetailModalShow={setMissionDetailModalShow}
          record={detailRecord}
          modifyRecords={modifyRecords}
        />
      </div>
    </div>
  );
}
