import institutos from '../models/institutes'
import { OK, FAIL, BITACORA, DATA, AddMSG } from '../../../api/middlewares/respPWA.handler'

////////////////////////////////////////////////////
// *********** GET SECTION INSTITUTES *********** //
////////////////////////////////////////////////////

// GET ALL INSTITUTES
export const getInstitutesAll = async () => {

    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = 'Extraer todos los institutos';
        data.method = 'GET';
        data.api = '/institutes';
        data.process = 'Extraer todos los institutos de la coleccion de cat_institutos';

        const InstitesAll = await institutos.find().then(instutes => {
            if (!instutes) {
                data.status = 404;
                data.messageDEV = "La base de datos no tiene institutos";
                throw Error(data.messageDEV);
            }

            return instutes;
        })

        //data.status = 200;
        data.messageUSR = "La extraccion de los institutos fue exitosa";
        data.dataRes = InstitesAll;
        bitacora = AddMSG(bitacora, data, 'OK', 200, true);
        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR = "La extracion de los Institutos no fue exitosa";
        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);

    } finally {
        //Haya o no haya error se ejecuta el finally
    }
}

/////////////////////////////////////////////////////
// *********** POST SECTION INSTITUTES *********** //
/////////////////////////////////////////////////////

// ADD NEW INSTITUTE
export const addInstitutes = async (newInstitute) => {

    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = 'Agregar un instituto';
        data.method = 'POST';
        data.api = '/institutes';
        data.process = 'Agregar un instituto a la coleccion de cat_institutos';

        const InstituteAdded = await institutos.insertMany(newInstitute, { order: true }).then(institute => {

            if (!institute) {
                data.status = 400;
                data.messageDEV = "La insercion del instituto en la base de datos <<NO>> tuvo exito";
                throw Error(data.messageDEV);
            }

            return institute;
        })

        //data.status = 200;
        data.messageUSR = "La insercion del instituto en la base de datos <<SI>> tuvo exito";
        data.dataRes = InstituteAdded;
        bitacora = AddMSG(bitacora, data, 'OK', 201, true);

        return OK(bitacora);

    } catch (error) {

        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR = "La insercion del instituto en la base de datos <<NO>> tuvo exito";
        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);

    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};

/////////////////////////////////////////////////////
// *********** PUT SECTION INSTITUTES *********** //
/////////////////////////////////////////////////////

// UPDATE INSTITUTES
export const putInstitutes = async (idInstitute, newInstitute) => {

    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = 'Modificar un instituto';
        data.method = 'PUT';
        data.api = '/institutes';
        data.process = 'Modificar un instituto de la coleccion de cat_institutos';

        const InstituteUpdated = await institutos.findOneAndUpdate({ IdInstitutoOK: idInstitute }, newInstitute).then(institute => {

            if (!institute) {
                data.status = 400;
                data.messageDEV = "La modificacion del instituto en la base de datos <<NO>> tuvo exito";
                throw Error(data.messageDEV);
            }

            return institute;
        })

        //data.status = 200;
        data.messageUSR = "La modificacion del instituto en la base de datos <<SI>> tuvo exito";
        data.dataRes = InstituteUpdated;
        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    } catch (error) {

        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR = "La modificacion del instituto en la base de datos <<NO>> tuvo exito";
        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);

    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};

/////////////////////////////////////////////////////
// *********** DELETE SECTION INSTITUTES *********** //
/////////////////////////////////////////////////////

// DELETE ONE INSTITUTE
export const deleteInstitutes = async (idInstitute) => {

    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = 'Eliminar un instituto';
        data.method = 'DELETE';
        data.api = '/institutes';
        data.process = 'Eliminar un instituto de la coleccion de cat_institutos';

        const { id } = idInstitute;

        const InstituteDeleted = await institutos.findOneAndDelete({ IdInstitutoOK: id }).then(institute => {

            if (!institute) {
                data.status = 400;
                data.messageDEV = "La eliminacion del instituto en la base de datos <<NO>> tuvo exito";
                throw Error(data.messageDEV);
            }

            return institute;
        })

        //data.status = 200;
        data.messageUSR = "La eliminacion del instituto en la base de datos <<SI>> tuvo exito";
        data.dataRes = InstituteDeleted;
        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    } catch (error) {

        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR = "La eliminacion del instituto en la base de datos <<NO>> tuvo exito";
        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);

    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};