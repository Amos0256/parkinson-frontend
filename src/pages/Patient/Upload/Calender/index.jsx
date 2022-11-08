
import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import './CalendarDemo.css';


export default function CalendarDemo() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    const [date1, setDate1] = useState(null);
    const [date8, setDate8] = useState(null);
    

    let minDate = new Date();
    minDate.setMonth(prevMonth);
    minDate.setFullYear(prevYear);

    let maxDate = new Date();
    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);
    
    return (
        <div>
            <div className="card calendar-demo">
                <div className="p-fluid">
                    <div className="">
                        <div class="title-text"></div>
                        <Calendar id="basic" dateFormat="yy/mm/dd" value={date1} onChange={(e) => setDate1(e.value)} placeholder="請輸入日期"/>
                    </div>
                    <div className="r">
                        <div class="title-text"></div>
                        <Calendar id="time12" value={date8} onChange={(e) => setDate8(e.value)} timeOnly hourFormat="12" placeholder='請輸入時間'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

