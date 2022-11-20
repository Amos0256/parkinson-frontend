import React, { createContext, useState } from 'react';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { useNavigate } from 'react-router-dom';
import DropdownDemo from '../../Upload/FirstPage/Selector/index'
import './index.css';

export default function Progress() {
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

  const [gripdisable, setGripDisable] = useState(false);
  const [pinchdisable, setPinchDisable] = useState(false);
  const [turndisable, setTurnDisable] = useState(false);
  const [liftdisable, setLiftDisable] = useState(false);

  const navigate = useNavigate();

  function uploadPage(opt) {
        navigate('/patient/upload',{
          state: {
            option: opt,
          }
        });
  }

  const [examtype, setExamType] = useState("");
  function gripSelect() {
    setExamType(newtype => "grip");
    uploadPage("grip");
  }
  function pinchSelect() {
    setExamType(newtype => "pinch");
    uploadPage("pinch");
  }
  function turnSelect() {
    setExamType(newtype => "turn");
    uploadPage("turn");
  }
  function liftSelect() {
    setExamType(newtype => "lift");
    uploadPage("lift");
  }
  

  return (
    <div className="progress">
      <div className="progressbar">
        <h3>檢測進度條</h3>
        <ProgressBar 
          value={25}
          displayValueTemplate={displayValueTemplate}
        />
      </div>

      <div className="waiting-exam">
        <h3>待檢測項目</h3>
        <Button
          className="p-button-outlined"
          label="手部抓握"
          disabled={gripdisable}
          onClick={() => {gripSelect();}}
          style={{ marginRight: "0.5rem" }}
        />
        <Button
          className="p-button-outlined"
          label="手指捏握"
          disabled={pinchdisable}
          onClick={() => {pinchSelect();}}
          style={{ marginRight: "0.5rem" }}
        />
        <Button 
          className="p-button-outlined"
          label="手掌翻面"
          disabled={turndisable}
          onClick={() => {turnSelect();}}
          style={{ marginRight: "0.5rem" }}
        />
        <Button
          className="p-button-outlined"
          label="抬腳"
          disabled={liftdisable}
          onClick={() => {liftSelect();}}
        />
      </div>
    </div>
  );
}