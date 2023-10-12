import mongoose, { ClientSession, ConnectOptions, Model, Document } from 'mongoose';

export const BITACORA = () => {

    const bitacora = {
        success: null,
        status: 0,
        process: '',
        messageUSR: '',
        messageDEV: '',
        countData: 0,
        countDataReq: 0,
        countDataRes: 0,
        countMsgUSR: 0,
        countMsgDEV: 0,
        data: [],
        session: ClientSession,
        loggedUser: ''
    }
    return bitacora;
};

export const DATA = () => {

    const data = {
        success: false,
        status: 0,
        process: '',
        principal: false,
        secuencia: 0,
        countDataReq: 0,
        countDataRes: 0,
        countFile: 0,
        messageUSR: '',
        messageDEV: '',
        method: '',
        api: '',
        dataReq: [],
        dataRes: [],
        file: []
    }

    return data;
};




/*     export const AddMSG = (bitacora, data) => {
	
    data.success    = data.success   || false;
    data.status     = data.status     || -1;
    data.process    = data.process    || 'No se especifico Proceso';
    data.principal  = data.principal  || false;
    
    data.secuencia++;
    
    if(data.messageDEV) {
        bitacora.messageDEV = data.messageDEV;
        bitacora.countMsgDEV++;
    }

    if(data.messageUSR) {
        bitacora.messageUSR = data.messageUSR;
        bitacora.countMsgUSR++;
    }

    if(data.dataReq) {
        bitacora.countDataReq++;
    }

    if(data.dataRes) {
        bitacora.countDataRes++;
    }
    
    bitacora.status = data.status;
    bitacora.data.push(data);
    bitacora.countData++;

    return bitacora;
}; */


export const AddMSG = (bitacora, data, tipo, status = 500, principal = false) => {

    if (tipo === 'OK') {
        data.success = data.success || true;
        bitacora.success = data.sucess || true;
    }
    else {
        data.success = data.success || false;
        bitacora.success = data.sucess || false;
    }

    data.status = data.status || status;
    data.process = data.process || 'No se especifico Proceso';
    data.principal = data.principal || principal;
    data.method = data.method || 'No se especifico Metodo';
    data.api = data.api || 'No se especifico API';

    data.secuencia++;

    if (data.messageDEV) {
        bitacora.messageDEV = data.messageDEV;
        bitacora.countMsgDEV++;
    }

    if (data.messageUSR) {
        bitacora.messageUSR = data.messageUSR;
        bitacora.countMsgUSR++;
    }

    if (data.dataReq) {
        data.countDataReq++;
        bitacora.countDataReq++;
    }

    if (data.dataRes) {
        data.countDataRes++;
        bitacora.countDataRes++;
    }

    if (data.file) {
        data.countFile++;
    }

    bitacora.status = data.status;
    bitacora.data.push(data);
    bitacora.countData++;

    return bitacora;
};


export const OK = (bitacora) => {
    return {
        success: bitacora.success || true,
        status: bitacora.status || 500,
        process: bitacora.process || 'No se especifico Proceso Principal',
        messageUSR: bitacora.messageUSR || 'No se especifico Mensaje Final de Usuario',
        messageDEV: bitacora.messageDEV || 'No se especifico Mensaje Final Tecnico',
        countData: bitacora.countData || 0,
        countDataReq: bitacora.countDataReq || 0,
        countDataRes: bitacora.countDataRes || 0,
        countMsgUSR: bitacora.countMsgUSR || 0,
        countMsgDEV: bitacora.countMsgDEV || 0,
        data: bitacora.data || [],
        session: bitacora.session || 'No se especifico Session de BD',
        loggedUser: bitacora.loggedUser || 'No se especificio el Usuario Logueado'
    }
};

export const FAIL = (bitacora) => {
    return {
        success: bitacora.success || false,
        status: bitacora.status || 500,
        process: bitacora.process || 'No se especifico Proceso Principal',
        messageUSR: bitacora.messageUSR || 'No se especifico Mensaje Final de Usuario',
        messageDEV: bitacora.messageDEV || 'No se especifico Mensaje Final Tecnico',
        countData: bitacora.countData || 0,
        countDataReq: bitacora.countDataReq || 0,
        countDataRes: bitacora.countDataRes || 0,
        countMsgUSR: bitacora.countMsgUSR || 0,
        countMsgDEV: bitacora.countMsgDEV || 0,
        data: bitacora.data || [],
        session: bitacora.session || 'No se especifico Session de BD',
        loggedUser: bitacora.loggedUser || 'No se especificio el Usuario Logueado'
    }
};


export const TRANSOPTIONS = () => {

    const transactionOptions = {
        readPreference: 'primary',
        //readPreference: 'secondary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
        maxCommitTimeMS: 1000
    };

    return transactionOptions;
};



