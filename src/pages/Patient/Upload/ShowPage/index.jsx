import React, { useContext} from "react";
import FirstPage from "../FirstPage";
import SecondPage from "../SecondPage";

import { stepContext } from 'pages/Patient/Upload/stepContext';
export default function ShowPage() {
    
    const msg = useContext(stepContext)

    return (
        <div>
            <div className="page">
                {(() => {
                    if(msg.Step === 0) {
                        return <FirstPage />
                    } else if(msg.Step === 1) {
                        return <SecondPage />
                    }
                })()}   
            </div>
            
        </div>
    );
}