import React, { useState, useContext } from 'react';
import { useLocation, Route } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import '../../InputBar.css';
import { inputContext } from 'pages/Patient/Upload/inputContext';

export var selectCheck = 0;

export default function DropdownDemo() {
    
    const msg = useContext(inputContext);

    var pos = null;
    const location = useLocation();
    if(location.state.option === "grip") {
        pos = { name: '手部抓握', code: '抓握' };
    }
    else if (location.state.option === "pinch") {
        pos = { name: '手部捏指', code: '手捏'};
    }
    else if (location.state.option === "turn") {
        pos = { name: '手掌翻面', code: '手翻'};
    }
    else if(location.state.option === "lift") {
        pos = { name: '抬腳', code: '抬腳'};
    }
    const [selectedPosition, setselectedPosition] = useState(pos);
    
    
    const handPos = [
        { name: '手部抓握', code: '抓握' },
        { name: '手部捏指', code: '手捏'},
        { name: '手掌翻面', code: '手翻'},
        { name: '抬腳', code: '抬腳'}
    ];
    const onPositionChange = (e) => {  
        // console.log(e.value);
        setselectedPosition(e.value);
        msg.setInputState({
            ...msg.InputState,
            select: 1
        });
    }
    
    return (
        <div>
            
            <div className="card">
                <div className="dropdown-demo">
                    <div className='space'>項目</div>
                    <Dropdown value={selectedPosition} options={handPos} onChange={onPositionChange} optionLabel="name" placeholder="請選擇項目" />
                </div>
            </div>

        </div>
        
    );
}