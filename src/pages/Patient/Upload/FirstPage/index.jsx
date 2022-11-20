import React, { useState, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import CalendarDemo from './Calender';
import DropdownDemo from './Selector';

import './InputBar.css';


export default function FirstPage () {
    const [value, setValue] = useState('');
    return (
        <div>
            <CalendarDemo />
            
            <div className="card inputtext-demo">
                <div className='space'>地點</div>
                <InputText value={value} onChange={(e) => setValue(e.target.value)} placeholder='請輸入地點'/>
            </div>
            <DropdownDemo />
            
        </div>  
    );
}