// Importar la clase modelo de productos y servicios
import ProdServ from '../models/ProdServ';
import boom from '@hapi/boom';
import {OK, FAIL} from '../../../middlewares/resp.handler';

// Metodo para obtener una lista de productos y servicios
export const getProdServList = async () => {
    let prodServList;

    try {
        prodServList = await ProdServ.find();
        return (prodServList);
    } catch (error) {
        //res.status(500).json({ message: 'Error: ' + ficError});
        throw boom.internal(error);
    }// try-catch

};// getProdServList

// Metodo para obtener solo 1 producto o servicio de la coleccion en base a su ID
export const getProdServItem = async (id, keyType) => {
    let prodServItem;

    try {
        if (keyType === 'IdInstitutoOK') {
            prodServItem = await ProdServ.findOne({
                IdInstitutoOK: id,
            });
        } else if (keyType === 'IdProdServOK') {
            prodServItem = await ProdServ.findOne({
                IdProdServOK: id,
            });
        }// if y else-if
        return (prodServItem);
    } catch (error) {
        throw boom.internal(error);
    }// try-catch

};// getProdServItem

export const deleteProdServItem = async (id, keyType) => {
    let prodServItem;
    try {
        if (keyType === 'IdInstitutoOK') {
            prodServItem = await ProdServ.findOneAndDelete({
                IdInstitutoOK: id,
            });
        } else if (keyType === 'IdProdServOK') {
            prodServItem = await ProdServ.findOneAndDelete({
                IdProdServOK: id,
            });
        }// if y else-if
        return (prodServItem);
    } catch (error) {
        throw boom.internal(error);
    }
};

// POST (ADD) Productos y/o Servicios.
export const postProdServItem = async (paProdServItem) => {
    try {
        const newProdServItem = new ProdServ(paProdServItem);
        return await newProdServItem.save();
    } catch (error) {
        throw error;
    }
};

//FIC: ADD MANY PERSONS FROM WEB/PWA ¡NO SAP!
//BORRAR EN CASO DE QUE NO SE USE
export const addManyPersonsPWA = async (persons) => {
    try {
        const personsAdded = await cat_personas.insertMany(persons, {order: true});
        return OK('Persona(s) agregada(s) correctamente al catalogo.', personsAdded);
    } catch (error) {
        if (error.code === 11000) {
            return FAIL(
                'Alguna(s) de las personas enviadas ya están registradas en el catalogo de la BD. Verifica la información e intenta de nuevo.',
                error
            );
        } else {
            return FAIL(
                'No se pudo agregar la persona al catalogo. Error en el servidor.',
                error
            );
        }
    }
};

//PUSH OBJECT NEW INFO ADICIONAL
//BORRAR EN CASO DE QUE NO SE USE
const pushObjInfoAdCO = async (id, objInfoAd, keyType) => {
    try {

        let query = {};

        if (keyType === "IdInstitutoOK") {
            query = {IdInstitutoOK: id};
        } else if (keyType === "IdProdServOK") {
            query = {IdProdServOK: id};
        } else {
            throw new Error(data.messageDEV);
        }

        const contractUpdatedCO = await Contratos.findOneAndUpdate(
            query,
            {$push: {contratos_info_adicional: objInfoAd}},
            {new: true}
        );
        return {succes: true, contractUpdatedCO};
    } catch (error) {
        return {succes: false, error};
    }
};

// PUT (MODIFY) INSTITUTOS
export const putProdServItem = async (id, puProdServItem, keyType) => {
    try {

        let query = {};

        if (keyType === "IdInstitutoOK") {
            query = {IdInstitutoOK: id};
        } else if (keyType === "IdProdServOK") {
            query = {IdProdServOK: id};
        } else {
            throw new Error(data.messageDEV);
        }

        return await ProdServ.findOneAndUpdate(query, puProdServItem, {
            new: true
        });
    } catch (error) {
        throw boom.badImplementation(error);
    }
};