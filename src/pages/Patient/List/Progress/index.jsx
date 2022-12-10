import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Route, useNavigate } from 'react-router-dom';
import './index.css';
import api from 'utils/api';
import useAuth from 'hooks/useAuth';

export default function Progress() {
  const { loading, isLogin } = useAuth();
  const [gripvisible, setGripVisible] = useState(false);
  const [pinchvisible, setPinchVisible] = useState(false);
  const [turnvisible, setTurnVisible] = useState(false);
  const [liftvisible, setLiftVisible] = useState(false);
  const [process, setProcess] = useState(0);
  let record = [];

  useEffect(() => {
    if (loading)
      return;
    
    if(isLogin){
      api("assoc-record", "GET")
        .then(res => {
          let mission_len = (res.missions).length;
          let mission = res.missions[mission_len - 1];
          record.length = 0;
          for (let i = 0; i < (mission.records).length; i++){
            record.push(mission.records[i]);
          }

          setProcess(100);
          for(let i = 0; i < record.length; i++) {
            if(record[i].category === "手部抓握") {
              if(record[i].status === "未上傳") {
                  setGripVisible(true);
                  setProcess(prev => prev - 25);
              }
            }
            else if(record[i].category === "手指捏握") {
              if(record[i].status === "未上傳") {
                setPinchVisible(true);
                setProcess(prev => prev - 25);
              }
            }
            else if(record[i].category === "手掌翻面") {
              if(record[i].status === "未上傳") {
                setTurnVisible(true);
                setProcess(prev => prev - 25);
              }
            }
            else {
              if(record[i].status === "未上傳") {
                setLiftVisible(true);
                setProcess(prev => prev - 25);
              }
            }
          }
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  }, [isLogin, loading]);
  
  const displayValueTemplate = (value) => {
    if (value === 0)
      return '0 / 4';
    else if(value === 25)
      return '1 / 4';
    else if(value === 50)
      return '2 / 4';
    else if(value === 75)
      return '3 / 4';
    else if(value === 100)
      return '4 / 4';
  }

  const navigate = useNavigate();
  function uploadPage(opt) {
    navigate('/patient/upload',{
      state: {
        option: opt,
      }
    });
  }

  function gripSelect() {
    uploadPage("grip");
  }
  function pinchSelect() {
    uploadPage("pinch");
  }
  function turnSelect() {
    uploadPage("turn");
  }
  function liftSelect() {
    uploadPage("lift");
  }
  

  return (
    <div className="progress">
      <div className="progressbar">
        <h3>檢測進度條</h3>
        <ProgressBar 
          value={process}
          displayValueTemplate={displayValueTemplate}
        />
      </div>

      <div className="waiting-exam">
        <h3 className="item-text">待檢測項目</h3>
        <Button
          className="p-button-outlined"
          label="手部抓握"
          visible={gripvisible}
          onClick={gripSelect}
          style={{ marginRight: "0.5rem" }}
        />
        <Button
          className="p-button-outlined"
          label="手指捏握"
          visible={pinchvisible}
          onClick={pinchSelect}
          style={{ marginRight: "0.5rem" }}
        />
        <Button 
          className="p-button-outlined"
          label="手掌翻面"
          visible={turnvisible}
          onClick={turnSelect}
          style={{ marginRight: "0.5rem" }}
        />
        <Button
          className="p-button-outlined"
          label="抬腳"
          visible={liftvisible}
          onClick={liftSelect}
        />
      </div>
    </div>
  );
}