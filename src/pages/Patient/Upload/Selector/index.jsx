import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import './DropdownDemo.css';

export default function DropdownDemo() {

    const [lazyItems, setLazyItems] = useState([]);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [selectedPosition, setselectedPosition] = useState(null);


    const cities = [
        { name: '手部抓握', code: '抓握' },
        { name: '手部捏指', code: '手捏'},
        { name: '手掌翻面', code: '手翻'},
        { name: '抬腳', code: '抬腳'}
    ];


    const onPositionChange = (e) => {
        setselectedPosition(e.value);
    }



    return (
        <div className="dropdown-demo">
            <div className="card">
                <div className='option-text'></div>
                <Dropdown value={selectedPosition} options={cities} onChange={onPositionChange} optionLabel="name" placeholder="請選擇項目" />
            </div>
        </div>
    );
}