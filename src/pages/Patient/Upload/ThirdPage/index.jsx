import React, { useState } from "react";
import 'primeicons/primeicons.css';
import "./result.css";

export default function ThirdPage() {
    return (
        <div>
            <div className="result" style={{'fontSize':'2em', color: "#495057"}}>
                
                <span className="result-text" >
                <i className="pi pi-check-circle" style={{'fontSize':'1em', color: '#01b901', 'padding-right':'10px'}}></i>
                    Upload Succeeded!
                </span>
            </div>
        </div>
    );
}