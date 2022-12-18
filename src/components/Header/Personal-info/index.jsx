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
    const profilerow = {
        display: 'flex',
        alignItems: 'center',
        fontSize: '18px',
        gap: '10px'
    };
    const profiletitle = {
        width: '80px',
        textAlign: 'left'
    };

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
            <div style={{ textAlign: "center" }}>
                <h2 style={{ marginTop: 0 }}>{currentUser.name}</h2>
                <h3>{currentUser.personal_id}</h3>
            </div>
            <div style={{ textAlign: "center" }}>
                {" "}
                <div style={profilerow}>
                    <div style={profiletitle}>性別</div>
                    <div>
                        {
                            {
                                male: "男",
                                female: "女",
                                else: "其他",
                            }[currentUser.gender]
                        }
                    </div>
                </div>
                <div style={profilerow}>
                    <div style={profiletitle}>生日</div>
                    <div>{currentUser.birthday}</div>
                </div>
                <div style={profilerow}>
                    <div style={profiletitle}>電話</div>
                    <div>{currentUser.phone}</div>
                </div>
                <div style={profilerow}>
                    <div style={profiletitle}>電子郵件</div>
                    <div>{currentUser.email}</div>
                </div>
            </div>
        </div>
    )

}