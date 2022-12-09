import React, { useState } from 'react';
import { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import api from "utils/api";

export default function AddPatient({ doctor, patients }){
    const toast = useRef(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [patientname, setPatientname] = useState("");
    const [personal_id, setPersonal_id] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const genderchoice = [
        { name: '男性', code: 'male' },
        { name: '女性', code: 'female' },
        { name: '其他', code: 'other' },
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
            console.log(res);

            if (!res.errors) {
                setDisplayBasic(false);
                clearInput();
                showSuccess(res.password);
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

    const showSuccess = (password) => {
        toast.current.show({severity:'success', summary: '自動產生密碼(請立即複製)', detail: password, sticky: true});
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }
    
    const confirm = (name) => {
        if (checkValidation() === true){
            addpatient(patientname, personal_id, phone, email, gender, birthday);
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

    const onGenderChange = (e) => {
        setSelectedGender(e.value);
        setGender(e.value.code);
    }

    

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="取消" icon="pi pi-times" onClick={() => cancell(name)} className="p-button-text" />
                <Button label="確認" icon="pi pi-check" style={{ background: '#4FC0FF'}} onClick={() => confirm(name)} autoFocus />
            </div>
        );
    }

    return (
        <div className="dialog-demo">
            <div className="card">
                <Toast ref={toast}></Toast>
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
                            <InputMask value={birthday} mask="9999-99-99" placeholder="範例：1900-01-01" onChange={(e) => setBirthday(e.target.value)} />
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