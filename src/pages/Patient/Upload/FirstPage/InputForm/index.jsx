import React, { useState, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import CalendarDemo from './Calender';
import DropdownDemo from './Selector';
import { inputContext } from '../../inputContext';
export var placeCheck = 0;
export default function InputForm (){
    const msg = useContext(inputContext);
    const [value, setValue] = useState(null);
    
    return (
        <div>
            <CalendarDemo />
            
            <div className="card inputtext-demo">
                <div className='space'>地點</div>
                <InputText value={value} 
                onChange={(e) => {
                    setValue(e.target.value);
                    msg.setInputState({
                        ...msg.InputState,
                        place:1
                    });
                }} placeholder='請輸入地點'/>
            </div>
            <DropdownDemo />
        </div>
    );
}