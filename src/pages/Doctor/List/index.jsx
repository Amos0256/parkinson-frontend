import Header from "../../../components/Header";
import Table from "./Table";
import AddPatient from "./AddPatient";
import useAuth from "hooks/useAuth";
import api from "utils/api";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function Doctor() {
  require("./index.css");

  const [patients, setPatients] = useState({});
  const [doctor, setDoctor] = useState({});
  const { user, isLogin, loading} = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) return;
    if (isLogin){
      if (user.roles[0].id === 2) {
        navigate("/patient");
      }
      api("assoc-record", "GET")
      .then((json) => {
        setDoctor(json);
        setPatients(json.patients);
      })
      .catch((e) => {
        alert(e.message);
        navigate("/doctor");
      });
    }
    else{
      navigate("/login");
    }
  }, [isLogin, loading]);

  return (
    <div className="doctor">
      <Header title={"主頁"}/>
      <AddPatient doctor={doctor} patients={patients}/>
      <Table patients={patients}/>
    </div>
  );
}
