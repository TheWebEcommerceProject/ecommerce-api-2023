import CatProdServ from "../models/productos";
import {
    OK,
    FAIL,
    BITACORA,
    DATA,
    AddMSG,
} from "../../../middlewares/respPWA.handler";

/////////////////////////////////////////////////////
// *********** PATCH SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

export const UpdateProduct = async (params, updateData) => {
    // Crear bitacora
    let bitacora = BITACORA();

    // Actualizar producto
    let response = UpdateProductMethod(bitacora, params, updateData);

    // Retornar respuesta
    return response;
};

export const UpdateProductMethod = async (bitacora, params, updateData) => {

    let data = DATA();

    try {
        bitacora.process = 'Modificar un producto.';
        data.process = 'Modificar un producto';
        data.method = 'PATCH';
        data.api = '/cat-prod-serv';

        // Convertir updateData a un array si no lo es
        //const dataArray = Array.isArray(updateData) ? updateData : [updateData];

        // Crear un objeto para guardar el producto actualizado
        let productoUpdated = null;

        // Encuentra el documento principal usando IdInstitutoOK, IdNegocioOK e IdPagoOK
        const filter = {
            IdInstitutoOK: params.IdInstitutoOK,
            IdProdServOK: params.IdProdServOK,
        };

        // Recorrer el array de objetos
        for (const key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                const value = updateData[key];

                const updateQuery = {$set: {[key]: value}};

                try {
                    productoUpdated = await CatProdServ.findOneAndUpdate(
                        filter,
                        updateQuery,
                        {new: true}
                    );

                    if (!productoUpdated) {
                        console.error("No se encontró un documento para actualizar con ese ID,", IdProdServOK);
                        data.status = 400;
                        data.messageDEV = 'La Actualización de un Subdocumento del producto NO fue exitoso.';
                        throw new Error(data.messageDEV);
                    }
                } catch (error) {
                    console.error(error);
                    data.status = 400;
                    data.messageDEV = 'La Actualizacion de un Subdocumento del producto NO fue exitoso.';
                    throw Error(data.messageDEV);
                }
            }
        }

        data.messageUSR = 'La Modificacion de los subdocumentos de producto SI fue exitoso.';
        data.dataRes = productoUpdated;
        bitacora = AddMSG(bitacora, data, 'OK', 201, true);
        return OK(bitacora);
    } catch (error) {
        console.error(error);
        if (!data.status) data.status = error.statusCode;
        let {message} = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR =
            'La Modificacionión del producto NO fue exitoso.' +
            '\n' +
            'Any operations that already occurred as part of this transaction will be rolled back.';
        bitacora = AddMSG(bitacora, data, 'FAIL');
        return FAIL(bitacora);
    }
};