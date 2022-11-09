import React, { useState, createContext, useContext} from "react";
import FirstPage from "../FirstPage";
import SecondPage from "../SecondPage";
import ThirdPage from "../ThirdPage";
import { Button } from 'primereact/button';

import { CurrentStep } from '../index.jsx'
import '../Button/button.css';


export default function ShowPage() {
    
    const step = useContext(CurrentStep)

    return (
        <div>
            {/* step: {step} */}
            <FirstPage />
            {/* <SecondPage/> */}
        </div>
    );
}