import React, { useState, useContext, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import CalendarDemo from './Calender';
import DropdownDemo from './Selector';
import { formContext } from '../../formContext';

export default function InputForm (){
    const form_context = useContext(formContext);
    const [value, setValue] = useState(null);
    // useEffect(() => {
    //     if(value === '') {
    //         msg.setInputState({...msg.InputState, place:0});
    //     }
    //     if(value !== '') {
    //         form_context.setForm({...form_context.Form, place:value});
    //     }
    // }, [value]);
    return (
        <div>
            <CalendarDemo /> 
            <div className="card inputtext-demo">
                <div className='space'>地點</div>
                <InputText value={value} 
                onChange={(e) => {
                    setValue(e.target.value);
                    form_context.setForm({...form_context.Form, place:e.target.value});
                }} placeholder='請輸入地點'/>
            </div>
            <DropdownDemo />
        </div>
    );
}