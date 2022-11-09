import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import '../InputBar.css';

export default function DropdownDemo() {

    const [selectedPosition, setselectedPosition] = useState(null);


    const handPos = [
        { name: '手部抓握', code: '抓握' },
        { name: '手部捏指', code: '手捏'},
        { name: '手掌翻面', code: '手翻'},
        { name: '抬腳', code: '抬腳'}
    ];


    const onPositionChange = (e) => {
        setselectedPosition(e.value);
    }



    return (
        <div className="card">
            <div className="dropdown-demo">
                <Dropdown value={selectedPosition} options={handPos} onChange={onPositionChange} optionLabel="name" placeholder="請選擇項目" />
            </div>
        </div>
    );
}