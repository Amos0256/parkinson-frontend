import React from 'react';
import Header from '../../../components/Header';
import Progress from './Progress';
import ResultDataTable from './ResultDataTable';
import './index.css';

export default function List() {
  return (
    <>
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

