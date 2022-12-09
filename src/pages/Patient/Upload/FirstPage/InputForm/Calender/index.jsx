
import React, { useState, useContext, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import '../../InputBar.css';
import { formContext } from 'pages/Patient/Upload/formContext';
import formatDate from 'utils/formatDate';
import formatTime from 'utils/formatTime';

export default function CalendarDemo() {

    const form_context = useContext(formContext);
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    const [date1, setDate] = useState(null);
    const [time, setTime] = useState(null);

    let minDate = new Date();
    minDate.setMonth(prevMonth);
    minDate.setFullYear(prevYear);

    let maxDate = new Date();
    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);
    useEffect(() => {
        if(time === '' || time === null) {
            form_context.setForm({...form_context.Form, time:null}); 
        }
    }, [time]);
    useEffect(() => {
        if(date1 === '' || date1 === null) {
            form_context.setForm({...form_context.Form, date:null}); 
        }
    }, [date1]);
    return (
        <div className='calendar-layout'>
            <div className="card calendar-demo">
                <div className="p-fluid">
                    <div className='space'>日期</div>
                        <div className="calender">
                            <Calendar id="basic" dateFormat="yy/mm/dd" value={date1} 
                            onChange={(e) => {
                                setDate(e.value); 
                                form_context.setForm({...form_context.Form, date:formatDate(e.value)});
                                
                            }}
                            showButtonBar
                            placeholder="請輸入日期"/>
                        </div>
                    <div className='space'>時間</div>
                        <div className="time">
                            <Calendar id="time24" value={time} 
                            onChange={(e) => {
                                setTime(e.value);
                                form_context.setForm({...form_context.Form, time:formatTime(e.value)});
                            }}  
                            timeOnly hourFormat="24" placeholder='請輸入時間'/>
                        </div>
                    
                </div>
            </div>
        </div>
    );
}

