import React, { useState, useContext, useEffect } from 'react';
import { useLocation, Route } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import '../../InputBar.css';
import { formContext } from 'pages/Patient/Upload/formContext';

export var pos = null;

export default function DropdownDemo() {
    const form_context = useContext(formContext);
    const location = useLocation();
    if(location.state.option === "grip") {
        pos = { name: '手部抓握'};
    }
    else if (location.state.option === "pinch") {
        pos = { name: '手部捏指'};
    }
    else if (location.state.option === "turn") {
        pos = { name: '手掌翻面'};
    }
    else if(location.state.option === "lift") {
        pos = { name: '抬腳'};
    }
    const [selectedPosition, setselectedPosition] = useState(pos);
    
    
    const handPos = [
        { name: '手部抓握'},
        { name: '手部捏指'},
        { name: '手掌翻面'},
        { name: '抬腳'}
    ];
    
    const onPositionChange = (e) => {  
        // console.log(e.value);
        setselectedPosition(e.value);
        // form_context.setForm({...form_context.Form, option:e.value.name})
    }
    useEffect(() => {
        if(selectedPosition !== null) {
            form_context.setForm({...form_context.Form, option:selectedPosition.name});
        }
        
    }, [selectedPosition]);
    // useEffect(() => {
    //     //console.log(selectedPosition.name);
    //     if(selectedPosition === null) {
    //         msg.setInputState({...msg.InputState, select:''});
    //     }
    //     if(selectedPosition !== null ) {
            
    //         form_context.setForm({...form_context.Form, option:selectedPosition.name});
    //         msg.setInputState({...msg.InputState, select:1});
    //     }
    // }, [selectedPosition]);
    
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