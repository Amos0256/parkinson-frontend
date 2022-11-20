import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function DialogDemo({ title }){
    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [value5, setValue5] = useState('');

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="取消" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="確認" icon="pi pi-check" style={{ background: '#4FC0FF'}} onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }

    return (
        <div className="dialog-demo">
            <div className="card">
                <Button label="新增病患" icon="pi pi-fw pi-pencil" style={{background: 'white', margin: '10px', border: '0px'}} onClick={() => onClick('displayBasic')} />
                <Dialog header="新增病患" visible={displayBasic} style={{ width: '60rem', height: 'auto'}} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                    <div className='dialog-content-1' style={{display:'flex', flexDirection:'row'}} >
                        <div className='dialog-input' >
                            <h5>患者姓名</h5>
                            <InputText value={value1}  onChange={(e) => setValue1(e.target.value)} />
                        </div>
                        <div className='dialog-input'>
                            <h5>身分證字號</h5>
                            <InputText value={value2}  onChange={(e) => setValue2(e.target.value)} />
                        </div>
                        <div className='dialog-input'>
                            <h5>連絡電話</h5>
                            <InputText value={value3} onChange={(e) => setValue3(e.target.value)} />
                        </div>
                    </div>
                    <div className='dialog-content-1' style={{display:'flex', flexDirection:'row'}} >
                        <div className='dialog-input' >
                            <h5>親屬姓名</h5>
                            <InputText value={value4} onChange={(e) => setValue4(e.target.value)} />
                        </div>
                        <div className='dialog-input'>
                            <h5>親屬連絡電話</h5>
                            <InputText value={value5} onChange={(e) => setValue5(e.target.value)} />
                        </div>
                    </div> 
                </Dialog>
            </div>
        </div>
    )
}