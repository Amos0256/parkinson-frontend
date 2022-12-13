import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { useNavigate } from 'react-router-dom';
import './index.css';
import api from 'utils/api';
import useAuth from 'hooks/useAuth';
import { upload_button } from 'pages/Patient/Upload';

export default function Progress() {
  const { loading, isLogin, user } = useAuth();
  const [gripvisible, setGripVisible] = useState(false);
  const [pinchvisible, setPinchVisible] = useState(false);
  const [turnvisible, setTurnVisible] = useState(false);
  const [liftvisible, setLiftVisible] = useState(false);
  const [missionnum, setMissionNum] = useState(0);
  const [process, setProcess] = useState(0);
  let record = [];
  
  
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
          let mission_len = (res.missions).length;
          let mission = res.missions[mission_len - 1];
          record.length = 0;
          for (let i = 0; i < (mission.records).length; i++){
            record.push(mission.records[i]);
          }
          setMissionNum(record.length);
          
          setProcess(record.length);
          for(let i = 0; i < record.length; i++) {
            if(record[i].category === "手部抓握") {
              if(record[i].status === "未上傳") {
                  setGripVisible(true);
                  setProcess(prev => prev - 1);
              }
            }
            else if(record[i].category === "手指捏握") {
              if(record[i].status === "未上傳") {
                setPinchVisible(true);
                setProcess(prev => prev - 1);
              }
            }
            else if(record[i].category === "手掌翻面") {
              if(record[i].status === "未上傳") {
                setTurnVisible(true);
                setProcess(prev => prev - 1);
              }
            }
            else {
              if(record[i].status === "未上傳") {
                setLiftVisible(true);
                setProcess(prev => prev - 1);
              }
            }
          }         
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
  
  function CalProcess() {
    return process / missionnum * 100;
  }

  const displayValueTemplate = (value) => {
    return process + "/" + missionnum;
  }

  const navigate = useNavigate();
  function uploadPage(opt) {
    
    if(opt === null) {
      navigate('/patient/upload');
    }
    else {
      navigate('/patient/upload',{
        state: {
          option: opt,
        }
      });
    }
    
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
        {(() => {
          
          if(CalProcess() === 100) {
            return (
              <div>
                <ProgressBar 
                  className='progressbar-finish'
                  value={CalProcess()}
                  displayValueTemplate={displayValueTemplate
                  }
                />
              </div>
            )
          } else {
            return (
              <div>
                <ProgressBar 
                    value={CalProcess()}
                    displayValueTemplate={displayValueTemplate}
                  />
              </div>
            )
          }
        })()}
      </div>
      <div className="waiting-exam">
        {(() => {
        // console.log(CalProcess()); 
          if(CalProcess() === 100) {
            return (
              <h3 className="item-text" style={{'color':'gray'}}>待檢測項目</h3>
            );
          }
          else {
            return (
              <h3 className="item-text">待檢測項目</h3>
            );
          } 
        })()}
        {/* <h3 className="item-text">待檢測項目</h3> */}
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