import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

export default function ResultDataTable() {
  const result = [
    {
      "examination": "手部抓握",
      "date": "2015-09-13",
      "time": "09:16:31",
      "frequency": 10,
      "status": "已處理",
      "feedback": "正常"
    },
    {
      "examination": "手指捏握",
      "date": "2020-05-29",
      "time": "11:59:06",
      "frequency": "",
      "status": "未處理"
    },
    {
      "examination": "手掌翻面",
      "date": "2021-07-01",
      "time": "13:26:09",
      "frequency": 24,
      "status": "待檢閱"
    },
    {
      "examination": "抬腳",
      "date": "2021-07-31",
      "time": "16:41:29",
      "frequency": 36,
      "status": "已處理",
      "feedback": "有巴金森氏症風險"
    },
    {
      "examination": "手部抓握",
      "date": "2022-11-05",
      "time": "12:40:59",
      "frequency": "",
      "status": "未處理"
    }
  ];

  const examination = [
    '手部抓握', '手指捏握', '手掌翻面', '抬腳'
  ];
  
  const statuses = [
    '已處理', '未處理', '待檢閱'
  ];

  const examinationFilterTemplate = (options) => {
    return (
      <Dropdown 
        value={options.value} 
        options={examination} 
        onChange={(e) => options.filterCallback(e.value, options.index)} 
        placeholder="選擇檢測項目" 
        className="p-column-filter" 
        showClear
      />
    );
  }
  
  const dateFilterTemplate = (options) => {
    return (
      <Calendar 
        value={options.value} 
        onChange={(e) => options.filterCallback(e.value, options.index)} 
        dateFormat="yy/mm/dd" 
        placeholder="yyyy/mm/dd" 
        mask="9999/99/99"
      />
    )
  }
  
  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.date);
  }
  
  const formatDate = (value) => {
    let date = new Date(value).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  
    return date;
  }
  
  const statusBodyTemplate = (rowData) => {
    return <span className={`examination-result status-${rowData.status}`}>{rowData.status}</span>;
  }
  
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
  }
  
  const statusItemTemplate = (option) => {
    return <span className={`examination-result status-${option}`}>{option}</span>;
  }

  return (
    <DataTable
      value={result}
      emptyMessage="無對應資料"
    >
      <Column 
        field="examination"
        header="檢測項目"
        sortable
        filter
        filterElement={examinationFilterTemplate}
        showFilterMenuOptions={false}
        showAddButton={false}
        filterMenuStyle={{ width: '14rem' }}
      />
      <Column
        field="date"
        header="上傳日期"
        dataType="date"
        body={dateBodyTemplate}
        sortable
        filter
        filterElement={dateFilterTemplate}
        showFilterMenuOptions={false}
        showAddButton={false}
      />
      <Column
        field="time"
        header="上傳時間"
        sortable
      />
      <Column
        field="place"
        header="地點"
        sortable
      />
      <Column 
        field="frequency"
        header="次數"
        sortable
      />
      <Column 
        field="status" 
        header="狀態" 
        body={statusBodyTemplate} 
        sortable 
        filter 
        filterElement={statusFilterTemplate} 
        showFilterMenuOptions={false} 
        showAddButton={false} 
        filterMenuStyle={{ width: '14rem' }}
      />
      <Column 
        field="feedback" 
        header="醫師回饋"
      />
    </DataTable>
  )
}