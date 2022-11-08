import React, { useState, useRef } from 'react';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import Header from '../../../components/Header';
import './Step/StepsDemo.css';
import './upload.css'

export default function Upload() {
    const [activeIndex, setActiveIndex] = useState(1);
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
                    <Steps model={items} />
                </div>
            </div>
        </div>
        
    );
}