import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { FilterMatchMode } from 'primereact/api';
import { useNavigate } from 'react-router-dom'
import api from 'utils/api';
import useAuth from 'hooks/useAuth';

export var record = [];

export default function ResultDataTable() {
  const { loading, isLogin, user } = useAuth();
  const navigate = useNavigate();
  const [ records, setRecords ] = useState([]);
  
  
  useEffect(() => {
    if (loading)
      return;
  
    if(isLogin){
      if (user.roles[0].id === 1) {
        navigate("/doctor");
      }
      else {
        api("assoc-record", "GET")
        .then(res => {
          let missions = res.missions;
          record.length = 0;
          console.log(missions);
          for (let i = 0; i < missions.length; i++){
            let temp = missions[i].records;
            for (let j = 0; j < temp.length; j++){
              (temp[j])['times'] = "第" + (i + 1) + "次";
              record.push(temp[j]);
            }
          }
          dataProcess();
          setRecords(record);
        })
        .catch((e) => {
          alert(e.message);
        });
      }
    }
    else {
      navigate('/login');
    }
  }, [isLogin, loading]);
  
  function dataProcess() {
    for(let i = 0; i < record.length; i++) {
      if(record[i].submit_time != null) {
        const date = new Date(record[i].submit_time);
        record[i].submit_time = date;
        (record[i])['submit_date'] = date;
      }
      
      if(record[i].result != null) {
        let temp = (record[i].result).split(",");
        let left = temp[0].replace(/[^0-9]/ig,"");
        let right = temp[1].replace(/[^0-9]/ig,"");
        record[i].result = "左:" + left + "\n右:" + right;
      }
    }
  }

  const [filter, setFilter] = useState({
    'category': { value: null },
    'submit_date': { value: null, matchMode: FilterMatchMode.DATE_IS },
    'status': { value: null }
  });

  const initFilter = () => {
    setFilter({
      'category': { value: null },
      'submit_date': { value: null, matchMode: FilterMatchMode.DATE_IS },
      'status': { value: null }
    });
  };

  useEffect(() => {
    initFilter();;
  }, []);

  const clearFilter = () => {
    initFilter();
  }

  const category = [
    '手部抓握', '手指捏握', '手掌翻面', '抬腳'
  ];
  
  const statuses = [
    '已檢閱', '待檢閱', '未處理', '未上傳'
  ];

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
  }

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.submit_date);
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
  
  const formatDate = (value) => {
    if(value != null){
      let date = new Date(value).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
  
      return date;
    }
  }
  
  const timeBodyTemplate = (rowData) => {
    return formatTime(rowData.submit_time);
  }

  const formatTime = (value) => {
    if(value != null){
      let time = new Date(value).toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      return time;
    }
  }

  const statusBodyTemplate = (rowData) => {
    return <span className={`category-result status-${rowData.status}`}>{rowData.status}</span>;
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
    return <span className={`category-result status-${option}`}>{option}</span>;
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button type="button" icon="pi pi-filter-slash" label="清除" className="p-button-outlined" onClick={clearFilter} />
      </div>
    )
  }

  const header = renderHeader();

  return (
    <DataTable
      value={records}
      emptyMessage="無對應資料"
      filters={filter}
      header={header}
    >
      <Column
        field="times"
        header="任務次數"
        sortable
      />
      <Column 
        field="category"
        header="檢測項目"
        sortable
        filter
        filterElement={categoryFilterTemplate}
        showFilterMenuOptions={false}
        showAddButton={false}
        filterMenuStyle={{ width: '14rem' }}
      />
      <Column
        field="submit_date"
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
        field="submit_time"
        header="上傳時間"
        body={timeBodyTemplate}
        sortable
      />
      <Column
        field="location"
        header="地點"
        sortable
      />
      <Column 
        field="result"
        header="次數"
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
        field="doctor_comment" 
        header="醫師回饋"
      />
    </DataTable>
  )
}