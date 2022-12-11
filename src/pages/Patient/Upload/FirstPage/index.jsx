import React, { useState, useContext, useEffect } from 'react';
import InputForm from './InputForm';
import { nextContext } from 'pages/Patient/Upload/nextContext';
import { formContext } from 'pages/Patient/Upload/formContext';


import './InputBar.css';

export default function FirstPage () {
    const form_context = useContext(formContext);
    const msg = useContext(nextContext); 
    
    useEffect(() => {
        // form_context.setForm({
        //     date: InputState.date,
        //     time: InputState.time,
        //     place: InputState.place,
        //     option: InputState.select
        // });
        if(form_context.Form.date !== null && form_context.Form.time !== null && form_context.Form.place !== '' && form_context.Form.option !== null) {
            msg.setNext(1);
        }
        else {
            msg.setNext(0);
        }
    }, [form_context]);
   


    // if(dateCheck*timeCheck*placeCheck*selectCheck === 1 && check) {
    //     // setInputState('ready');
    //     // alert('ready');
    //     check = 0;
    // }
    return (
        <div> 
            <InputForm />
            <br/>
            <span>{form_context.Form.date}</span>
            <br/>
            <span>{form_context.Form.time}</span>
            <br/>
            <span>{form_context.Form.place}</span>
            <br/>
            <span>{form_context.Form.option}</span>
        </div>  
    );
}
