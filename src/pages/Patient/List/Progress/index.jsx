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
  function uploadPage() {
    navigate('/patient/upload');
  }

  const ExamContext = createContext();

  const [examtype, setExamType] = useState("");
  function gripSelect() {
    setExamType(newtype => "grip");
    paramSet();
  }
  function pinchSelect() {
    setExamType(newtype => "pinch");
    paramSet();
  }
  function turnSelect() {
    setExamType(newtype => "turn");
    paramSet();
  }
  function liftSelect() {
    setExamType(newtype => "lift");
    paramSet();
  }

  function paramSet() {
    return (
      <ExamContext.Provider value={ examtype }>
        <DropdownDemo/>
      </ExamContext.Provider>
    );
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
          onClick={() => {gripSelect(); uploadPage();}}
          style={{ marginRight: "0.5rem" }}
        />
        <Button
          className="p-button-outlined"
          label="手指捏握"
          disabled={pinchdisable}
          onClick={() => {pinchSelect(); uploadPage();}}
          style={{ marginRight: "0.5rem" }}
        />
        <Button 
          className="p-button-outlined"
          label="手掌翻面"
          disabled={turndisable}
          onClick={() => {turnSelect(); uploadPage();}}
          style={{ marginRight: "0.5rem" }}
        />
        <Button
          className="p-button-outlined"
          label="抬腳"
          disabled={liftdisable}
          onClick={() => {liftSelect(); uploadPage();}}
        />
      </div>
    </div>
  );
}