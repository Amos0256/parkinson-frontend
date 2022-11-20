import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import '../InputBar.css';

export default function DropdownDemo() {

    var pos = '';
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
    
    // console.log(context.examtype);
    const handPos = [
        { name: '手部抓握', code: '抓握' },
        { name: '手部捏指', code: '手捏'},
        { name: '手掌翻面', code: '手翻'},
        { name: '抬腳', code: '抬腳'}
    ];
    const onPositionChange = (e) => {  
        console.log(e.value);
        setselectedPosition(e.value);
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