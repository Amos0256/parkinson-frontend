import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import api from "utils/api";

export default function AddPatient({ doctor, patients }){
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayPassword, setDisplayPassword] = useState(false);
    const [patientname, setPatientname] = useState("");
    const [personal_id, setPersonal_id] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("test1234");
    const [showPw, setShowPw] = useState(false);

    const genderchoice = [
        { name: '男性', code: 'male' },
        { name: '女性', code: 'female' },
        { name: '其他', code: 'unknown' },
    ];
    const [errorMessage,setErrorMessage] = useState({
        patientname: '', 
        personal_id: '', 
        gender: '', 
        birthday: '', 
        phone: '', 
        email: '', 
    });

    const getErrorMessage = (name) => {
        return(
        <small style={{color: 'red', display: 'block'}}>{errorMessage[name]}</small>
        )
    }
    function addpatient(patientname, personal_id, phone, email, gender, birthday) {
        return api("add-patient", "POST", {
          name: patientname,
          email,
          phone,
          gender,
          birthday,
          personal_id,
        })
          .then((res) => {
            if (!res.errors) {
                setDisplayBasic(false);
                clearInput();
                setPassword(res.password);
                setDisplayPassword(true);
            }    
            else if (res.errors) {
                setErrorMessage({patientname: res.errors.name, personal_id: res.errors.personal_id, email: res.errors.email, phone: res.errors.phone, birthday: res.errors.birthday, gender: res.errors.gender});
            }
            else {
                alert('未知錯誤，請回報錯誤訊息');
            }
          })
          .catch((e) => {
            console.log('這是錯誤');
            console.log(e);
          })
      }

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }
    
    const confirm = (name) => {
        if (checkValidation() === true){
            addpatient(patientname, personal_id, phone, email, gender, formatDate(birthday));
        }
    }
    const cancell = (name) => {
        dialogFuncMap[`${name}`](false);
        clearInput();
    }
    function clearInput(){
        setPatientname("");
        setPersonal_id("");
        setPhone("");
        setGender("");
        setSelectedGender("");
        setBirthday("");
        setEmail("");
        setErrorMessage({});
    }

    function checkValidation(){
        let valid = true;
        // name field
        if (!patientname){
            setErrorMessage(prevState => {
                return {...prevState, patientname: '請輸入姓名'}
            });
            valid = false;
        }
        else{
            setErrorMessage(prevState => {
                return {...prevState, patientname: ''}
            });
        }

        // personal_id field
        let flag = true;
        if (!/^[A-Z]+[0-9]{9}$/.test(personal_id)){
            setErrorMessage(prevState => {
                return {...prevState, personal_id: '請輸入正確的身分證號碼'}
            });
            flag = false;
        }
        else if (personal_id === doctor.personal_id){
            setErrorMessage(prevState => {
                return {...prevState, personal_id: '此身分證號碼已存在'}
            });
            flag = false;
        }
        else{
            for (let i = 0; i < patients.length; i++){
                if (patients[i].personal_id === personal_id){
                    setErrorMessage(prevState => {
                        return {...prevState, personal_id: '此身分證號碼已存在'}
                    });
                    flag = false;
                    break;
                }
            }
        }
        if (flag){
            setErrorMessage(prevState => {
                return {...prevState, personal_id: ''}
            });
        }
        else{
            valid = false;
        }

        //email field
        if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(email)){
            setErrorMessage(prevState => {
                return {...prevState, email: '請輸入正確的電子郵件格式'}
            });
            valid = false;
        }
        else{
            setErrorMessage(prevState => {
                return {...prevState, email: ''}
            });
        }

        // phone field
        if (!phone){
            setErrorMessage(prevState => {
                return {...prevState, phone: '請輸入連絡電話'}
            });
            valid = false;
        }
        else{
            setErrorMessage(prevState => {
                return {...prevState, phone: ''}
            });
        }

        // birthday field
        if (!birthday){
            setErrorMessage(prevState => {
                return {...prevState, birthday: '請輸入完整的日期'}
            });
            valid = false;
        }
        else{
            setErrorMessage(prevState => {
                return {...prevState, birthday: ''}
            });
        }

        // gender field
        if (!gender){
            setErrorMessage(prevState => {
                return {...prevState, gender: '請輸入性別'}
            });
            valid = false;
        }
        else{
            setErrorMessage(prevState => {
                return {...prevState, gender: ''}
            });
        }

        return valid;
    }

    const formatDate = (value) => {
        if (value == null){
            return null;
        }
        return new Date(value).toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
    }

    const onGenderChange = (e) => {
        setSelectedGender(e.value);
        setGender(e.value.code);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="取消" icon="pi pi-times" style={{color: 'rgb(82, 79, 79)'}} onClick={() => cancell(name)} className="p-button-text" />
                <Button label="確認" icon="pi pi-check" style={{ background: '#4FC0FF', color: 'rgb(82, 79, 79)'}} onClick={() => confirm(name)} autoFocus />
            </div>
        );
    }

    const footer2 = (
        <div>
          <Button label="確定" style={{background: '#4FC0FF'}}
          onClick={() => setDisplayPassword(false)}
           />
        </div>
    );

    return (
        <div className="dialog-demo">
            <div className="card">
            <Dialog
                header={"新增成功"}
                footer={footer2}
                visible={displayPassword}
                style={{ width: "350px" }}
                onHide={() => setDisplayPassword(false)}
            >
                自動產生密碼如下，請盡快通知患者使用新密碼登入，並修改密碼!
                <div className="p-inputgroup" style={{ marginTop: "20px" }}>
                <span className="p-inputgroup-addon">
                    <i className="pi pi-key"></i>
                </span>
                <InputText
                    type={showPw ? "text" : "password"}
                    value={password}
                    placeholder="密碼"
                    readOnly
                />
                <span
                    className="p-inputgroup-addon"
                    style={{ backgroundColor: "white", cursor: "pointer" }}
                    onClick={() => setShowPw(!showPw)}
                >
                    <i className={`pi ${showPw ? "pi-eye-slash" : "pi-eye"}`}></i>
                </span>
                </div>
                </Dialog>
                <Button label="新增病患" icon="pi pi-fw pi-pencil" style={{background: 'white', margin: '10px', border: '0px'}} onClick={() => onClick('displayBasic')} />
                <Dialog header="新增病患" visible={displayBasic} style={{ width: '60rem', height: 'auto'}} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                    <div className='dialog-content-1' style={{display:'flex', flexDirection:'row'}} >
                        <div className='dialog-input' >
                            <h5>患者姓名</h5>
                            <InputText value={patientname}  onChange={(e) => setPatientname(e.target.value)} />
                            {getErrorMessage('patientname')}
                        </div>
                        <div className='dialog-input'>
                            <h5>身分證字號</h5>
                            <InputText value={personal_id}  onChange={(e) => setPersonal_id(e.target.value)} />
                            {getErrorMessage('personal_id')}
                        </div>
                        <div className='dialog-input'>
                            <h5>性別</h5>
                            <Dropdown value={selectedGender} options={genderchoice} optionLabel="name" onChange={onGenderChange} placeholder="選擇性別"/>
                            {getErrorMessage('gender')}
                        </div>
                    </div>
                    <div className='dialog-content-1' style={{display:'flex', flexDirection:'row'}} >
                        <div className='dialog-input' >
                            <h5>生日(請輸入西元年月日)</h5>
                            <Calendar value={birthday} mask="9999-99-99" onChange={(e) => setBirthday(e.target.value)} dateFormat="yy-mm-dd" />
                            {getErrorMessage('birthday')}
                        </div>
                        <div className='dialog-input'>
                            <h5>聯絡電話</h5>
                            <InputText value={phone} onChange={(e) => setPhone(e.target.value)} />
                            {getErrorMessage('phone')}
                        </div>
                        <div className='dialog-input'>
                            <h5>電子信箱</h5>
                            <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
                            {getErrorMessage('email')}
                        </div>
                    </div> 
                </Dialog>
            </div>
        </div>
    )
}