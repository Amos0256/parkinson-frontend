import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function DialogDemo({ title }){
    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');
    const [value1, setValue1] = useState('');

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
                <Button label="新增病患" icon="pi pi-fw pi-pencil" style={{background: 'white', margin: '10px', border: '0px', position: 'relative' }} onClick={() => onClick('displayBasic')} />
                <Dialog header="輸入患者身分證字號：" visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                    <InputText value={value1} onChange={(e) => setValue1(e.target.value)} placeholder="Ex: A123456789" className='inputtext-test'/>
                </Dialog>
            </div>
        </div>
    )
}