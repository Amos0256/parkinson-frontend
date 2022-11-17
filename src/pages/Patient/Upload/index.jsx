import React, { useState, useRef } from 'react';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast'; 
import { Button } from 'primereact/button';
import {Link, useNavigate} from 'react-router-dom';

import { stepContext } from './stepContext';
import Header from '../../../components/Header';
import ShowPage from './ShowPage';
import './StepsDemo.css';
import './layout.css'

export default function Upload() {
    const navigate = useNavigate();
    const [Step, setStep] = useState(0);
    function nextPage() {
        setStep(preStep => preStep + 1)
    }
    function prePage() {
        setStep(preStep => preStep - 1)
    }
    function BacktoFirstPage() {
        setStep(Step => 0)
    }
    function Confirm() {
        navigate('/patient');
    }

    const toast = useRef(null);
    const items = [
        {
            label: '選擇測試項目',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'First Step', detail: event.item.label });
            }
        },
        {
            label: '上傳影片',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'Second Step', detail: event.item.label });
            }
        },
        {
            label: '檢視結果與確認',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'Third Step', detail: event.item.label });
            }
        }
    ];

   
    return (
        <div>
            <Header title={"DEV[上傳頁面]"}/>
            <div className="steps-demo">
                <Toast ref={Toast}></Toast>
                
                <div className="card">
                    {/* <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} /> */}
                    <Steps model={items} activeIndex={Step} readOnly={false}/>
                </div>
            </div>
            
            {/* first page */}
            {/* <ShowPage /> */}
            <div className="main-func">
            <stepContext.Provider value={{Step, setStep}}>
                <ShowPage />
            </stepContext.Provider>
            </div>
        
            <div className='button-layout'>
                <div>
                    {(() => {
                        if(Step === 0) {
                            return (
                                <div className="button-step-first">
                                    <Button label="下一步" onClick={nextPage} icon="pi pi-angle-right" iconPos="right" style={{'fontSize': '1em', 'box-shadow': '-5px 5px 10px rgba(0,0,0,0.1), 5px 0 10px rgba(0,0,0,0.1)'}}/> 
                                </div>
                            )                         
                        } else if(Step === 1) {
                            return (
                                <div className="button-step">
                                    <React.Fragment>
                                    
                                            <Button label="上一步" onClick={prePage} icon="pi pi-angle-left" iconPos="left" style={{'fontSize': '1em', 'box-shadow': '-5px 5px 10px rgba(0,0,0,0.1), 5px 0 10px rgba(0,0,0,0.1)'}} />
                                            <Button label="下一步" onClick={nextPage} icon="pi pi-angle-right" iconPos="right" style={{'fontSize': '1em', 'box-shadow': '-5px 5px 10px rgba(0,0,0,0.1), 5px 0 10px rgba(0,0,0,0.1)'}}/>
 
                                    </React.Fragment>
                                </div>
                            );
                        } else {
                            return (
                                <div className="button-step">
                                    <React.Fragment>  
                                        <Button label="確認" onClick={Confirm} icon="pi pi-check" iconPos="right" style={{'fontSize': '1em', 'box-shadow': '-5px 5px 10px rgba(0,0,0,0.1), 5px 0 10px rgba(0,0,0,0.1)'}} />
                                        <Button label="重新上傳" onClick={BacktoFirstPage} icon="pi pi-replay" iconPos="right" style={{'fontSize': '1em', 'box-shadow': '-5px 5px 10px rgba(0,0,0,0.1), 5px 0 10px rgba(0,0,0,0.1)'}}/>
                                    </React.Fragment>
                                </div>
                            );
                        }
                    })()}       
                </div>
            </div>
        </div>
    );
}