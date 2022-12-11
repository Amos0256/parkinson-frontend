import React, { useState, useContext, useEffect } from 'react';
import { useLocation, Route } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import '../../InputBar.css';
import { formContext } from 'pages/Patient/Upload/formContext';
import { record } from 'pages/Patient/List/ResultDataTable';
export var pos = null;
export var cur_record_id = '';

export default function DropdownDemo() {
    const form_context = useContext(formContext);
    const location = useLocation();
    if(location.state.option === "grip") {
        pos = { name: '手部抓握'};
    }
    else if (location.state.option === "pinch") {
        pos = { name: '手指捏握'};
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
        { name: '手指捏握'},
        { name: '手掌翻面'},
        { name: '抬腳'}
    ];
    
    const onPositionChange = (e) => {  
        // console.log(e.value);
        var flag = 0;
        //console.log(record);
        for(let i = 0; i<record.length; i++) {
            
            let value = JSON.stringify(e.value);
            console.log("value: ",value);
            value = value.replace(/name/g, '');
            value = value.replace(/"/g, '');
            value = value.replace(/:/g, '');
            value = value.replace(/{/g, '');
            value = value.replace(/}/g, '');
            console.log("value: ",value);
            if(record[i].category === value && record[i].status === '未上傳') {
                // cur_record_id = i;
                setselectedPosition(e.value);
                flag = 1;
                break;
            }
        }
        if(flag === 0) {
            alert('你所選擇的項目非檢測項目');
        }
        
        // form_context.setForm({...form_context.Form, option:e.value.name})
    }
    useEffect(() => {
        if(selectedPosition !== null) {
            let value = JSON.stringify(selectedPosition);
            value = value.replace(/name/g, '');
            value = value.replace(/"/g, '');
            value = value.replace(/:/g, '');
            value = value.replace(/{/g, '');
            value = value.replace(/}/g, '');
            form_context.setForm({...form_context.Form, option:selectedPosition.name});
            
            for(let i = 0; i<record.length; i++) {
                console.log(record[i]);
                console.log(record[i].mission_id);
                console.log(value);
                //console.log(record[i].id);
                if(record[i].category === value && record[i].status === '未上傳') {
                    cur_record_id = i;
                    console.log("mission_id: ", record[cur_record_id].mission_id);
                    break;
                }
            }
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