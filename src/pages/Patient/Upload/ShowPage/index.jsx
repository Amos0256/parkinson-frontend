import React, { useState, createContext, useContext} from "react";
import FirstPage from "../FirstPage";
import SecondPage from "../SecondPage";
import ThirdPage from "../ThirdPage";

import { stepContext } from "../stepContext";
export default function ShowPage() {
    
    const msg = useContext(stepContext)

    return (
        <div>
            {msg.Step}
            <div className="page">
                {(() => {
                    if(msg.Step === 0) {
                        return <FirstPage />
                    } else if(msg.Step === 1) {
                        return <SecondPage />
                    } else {
                        return <ThirdPage />
                    }
                })()}   
            </div>
            
        </div>
    );
}