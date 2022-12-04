import React from "react";
import { Card } from 'primereact/card';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import api from "utils/api";
import useAuth from "hooks/useAuth";

export default function Personal_info(){
    const [currentUser, setCurrentUser] = useState([]);
    const { user, isLogin, loading } = useAuth();
    const navigate = useNavigate("");

    useEffect(() => {
        if (loading) return;
        if (isLogin){
          api("user-info", "GET")
          .then((json) => {
            setCurrentUser(json);
          })
          .catch((e) => {
            alert(e.message);
            navigate("/login");
          });
        }
        else{
          navigate("/login");
        }
      }, [isLogin, loading]);

    return(
        <div>
            <Card title="基本資料" style={{margin:"1rem", marginTop: "0px", background:"#4FC0CF33"}}>
                <h3>
                    姓名 {currentUser.name}
                </h3>
                <h3>
                    身分證字號 {currentUser.personal_id}
                </h3>
                <h3>
                    生日 {currentUser.birthday}
                </h3>
                
            </Card>
            <Card title="聯絡資訊" style={{margin:"1rem", marginBottom: "0", background:"#4FC0FF33"}}>
                <h3>
                    電子信箱 {currentUser.email}
                </h3>
                <h3>
                    連絡電話 {currentUser.phone}
                </h3>
            </Card>
        </div>
    )

}