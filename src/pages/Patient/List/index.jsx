import React from 'react';
import Header from '../../../components/Header';
import Progress from './Progress';
import ResultDataTable from './ResultDataTable';
import './index.css';

export default function List() {
  /*
  const items = [
    {
      label: "檢測結果",
      icon: "pi pi-fw pi-chart-bar"
    },
    {
      label: "上傳影片",
      icon: "pi pi-fw pi-upload"
    },
    {
      label: "OOO病患",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "個人資料",
          icon: "pi pi-fw pi-user-edit"
        },
        {
          label: "登出",
          icon: "pi pi-fw pi-sign-out"
        }
      ]
    }
  ];
  const start = <div>Parkinson's</div>;
  */

  return (
    <>
      {/*
      <Menubar model={items} start={start}/>
      */}
      <Header/>
      <div className="progress">
        <Progress/>
      </div>

      <div className="datatable">
        <ResultDataTable/>
      </div>
    </>
  );
}

