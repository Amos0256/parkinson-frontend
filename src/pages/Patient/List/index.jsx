import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import Progress from './Progress';
import ResultDataTable from './ResultDataTable';
import useAuth from 'hooks/useAuth';
import './index.css';

export default function List() {
  const { loading, isLogin, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (isLogin) {
      if (user.roles[0].id === 1) {
        navigate("/doctor");
      }
    } else {
      navigate("/login");
    }
  }, [isLogin, loading]);

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

