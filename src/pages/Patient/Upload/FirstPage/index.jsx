import React, { useState, useContext } from 'react';
import InputForm from './InputForm';
import { inputContext } from '../inputContext';
import './InputBar.css';
import { dateCheck, timeCheck } from './InputForm/Calender';
import { selectCheck } from './InputForm/Selector';
import { placeCheck } from './InputForm';

export var dateState = 0;
export var timeState = 0;
export var placeState = 0;
export var selectState = 0;
export default function FirstPage () {
    
    
    const [InputState, setInputState] = useState({date:0, time:0, place:0, select:0}); 
    
    if(InputState.date === 1) {
         dateState = 1;
    }
    if(InputState.time === 1) {
        timeState = 1;
    }
    if(InputState.place === 1) {
        placeState = 1;
    }
    if(InputState.select === 1) {
        selectState = 1;
    }

    // if(dateCheck*timeCheck*placeCheck*selectCheck === 1 && check) {
    //     // setInputState('ready');
    //     // alert('ready');
    //     check = 0;
    // }
    return (
        <div>
            <inputContext.Provider value={{InputState, setInputState}}>
                <InputForm />
            </inputContext.Provider>

            <span>{InputState.date}</span>
            <br/>
            <span>{InputState.time}</span>
            <br/>
            <span>{InputState.place}</span>
            <br/>
            <span>{InputState.select}</span>
            {/* <span>add ALERT feature!</span> */}
            
        </div>  
    );
}
