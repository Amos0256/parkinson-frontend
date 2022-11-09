import React, { useState, useRef, createContext } from 'react';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast'; 
import { Button } from 'primereact/button';


import Header from '../../../components/Header';
import ShowPage from './ShowPage';
import './Step/StepsDemo.css';

export const CurrentStep = createContext();


export default function Upload({children}) {
    
    const [Step, setStep] = useState(0);
    function nextPage() {
        setStep(preStep => preStep + 1)
    }
    function prePage() {
        setStep(preStep => preStep - 1)
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
            <ShowPage />
            <div className="button-step">
                <Button label="上一步" onClick={prePage} icon="pi pi-angle-left" iconPos="left" style={{'fontSize': '1em'}} />
                <Button label="下一步" onClick={nextPage} icon="pi pi-angle-right" iconPos="right" style={{'fontSize': '1em'}}/>    
                <CurrentStep.Provider value={{Step, setStep}}>
                    {children}
                </CurrentStep.Provider>
            </div>
            {/* <Upload_box /> */}
            {/* second page */}
            {/* third page */}
            
            
            
        </div>
    );
}