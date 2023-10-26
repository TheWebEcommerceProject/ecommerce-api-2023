import prodServs from "../models/prodServ.models";
import {
    OK,
    FAIL,
    BITACORA,
    DATA,
    AddMSG,
} from "../../middlewares/respPWA.handler";

////////////////////////////////////////////////////
// *********** GET SECTION eCOMMERCE *********** //
////////////////////////////////////////////////////

// GET ALL eCOMMERCE
export const getProdServAll = async () => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Extraer todos los productos y/o servicios";
        data.method = "GET";
        data.api = "/prodserv";
        data.process =
            "Extraer todos los productos o servicios de la coleccion de cat_prod_serv";

        const ProdServAll = await prodServs.find().then((prodServ) => {
            if (!prodServ) {
                data.status = 404;
                data.messageDEV = "La base de datos no tiene productos y/o servicios";
                throw Error(data.messageDEV);
            }

            return prodServ;
        });

        //data.status = 200;
        data.messageUSR =
            "La extraccion de los productos y/o servicios fue exitosa";
        data.dataRes = ProdServAll;
        bitacora = AddMSG(bitacora, data, "OK", 200, true);
        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let {message} = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR =
            "La extracion de los productos y/o servicios no fue exitosa";
        bitacora = AddMSG(bitacora, data, "FAIL");

        return FAIL(bitacora);
    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};

// GET ONE eCOMMERCE
export const getProdServOne = async (idProdServ, keyType) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Extraer uno de los productos y/o servicios";
        data.method = "GET";
        data.api = "/prodserv/:id";
        data.process =
            "Extraer uno de los productos o servicios de la coleccion de cat_prod_serv";

        let query = {};

        if (keyType === "IdInstitutoOK") {
            query = {IdInstitutoOK: idProdServ};
        } else if (keyType === "IdProdServOK") {
            query = {IdProdServOK: idProdServ};
        } else {
            throw new Error(data.messageDEV);
        }

        const ProdServOne = await prodServs.findOne(query).then((prodServ) => {
            if (!prodServ) {
                data.status = 404;
                data.messageDEV = "La base de datos no tiene productos y/o servicios";
                throw Error(data.messageDEV);
            }

            return prodServ;
        });


        //data.status = 200;
        data.messageUSR =
            "La extraccion del productos y/o servicios fue exitosa";
        data.dataRes = ProdServOne;
        bitacora = AddMSG(bitacora, data, "OK", 200, true);
        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let {message} = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR =
            "La extracion del productos y/o servicios no fue exitosa";
        bitacora = AddMSG(bitacora, data, "FAIL");

        return FAIL(bitacora);
    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};

/////////////////////////////////////////////////////
// *********** POST SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

// ADD NEW eCOMMERCE
export const addProdServ = async (newProdServ) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar un nuevo producto y/o servicio";
        data.method = "POST";
        data.api = "/prodserv";
        data.process =
            "Agregar un nuevo producto y/o servicio a la coleccion de cat_prod_serv";

        const ProdServAdded = await prodServs
            .insertMany(newProdServ, {order: true})
            .then((prodServ) => {
                if (!prodServ) {
                    data.status = 400;
                    data.messageDEV =
                        "La insercion del producto y/o servicio en la base de datos <<NO>> tuvo exito";
                    throw Error(data.messageDEV);
                }

                return prodServ;
            });

        //data.status = 200;
        data.messageUSR =
            "La insercion del producto y/o servicio en la base de datos <<SI>> tuvo exito";
        data.dataRes = ProdServAdded;
        bitacora = AddMSG(bitacora, data, "OK", 201, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let {message} = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR =
            "La insercion del producto y/o servicio en la base de datos <<NO>> tuvo exito";
        bitacora = AddMSG(bitacora, data, "FAIL");

        return FAIL(bitacora);
    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};

/////////////////////////////////////////////////////
// *********** PUT SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

// UPDATE eCOMMERCE
export const putProdServ = async (idProdServ, newProdServ, keyType) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Modificar un producto y/o servicio";
        data.method = "PUT";
        data.api = "/prodserv/:id";
        data.process = "Modificar un producto y/o servicio de la coleccion de cat_prod_Serv";

        let query = {};

        if (keyType === "IdInstitutoOK") {
            query = {IdInstitutoOK: idProdServ};
        } else if (keyType === "IdProdServOK") {
            query = {IdProdServOK: idProdServ};
        } else {
            throw new Error(data.messageDEV);
        }

        const ProdServUpdated = await prodServs
            .findOneAndUpdate(query, newProdServ)
            .then((institute) => {
                if (!institute) {
                    data.status = 400;
                    data.messageDEV =
                        "La modificacion del producto y/o servicio en la base de datos <<NO>> tuvo exito";
                    throw Error(data.messageDEV);
                }

                return institute;
            });

        //data.status = 200;
        data.messageUSR =
            "La modificacion del producto y/o servicio en la base de datos <<SI>> tuvo exito";
        data.dataRes = ProdServUpdated;
        bitacora = AddMSG(bitacora, data, "OK", 200, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let {message} = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR =
            "La modificacion del producto y/o servicio en la base de datos <<NO>> tuvo exito";
        bitacora = AddMSG(bitacora, data, "FAIL");

        return FAIL(bitacora);
    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};

/////////////////////////////////////////////////////
// *********** DELETE SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

// DELETE ONE eCOMMERCE
export const deleteProdServ = async (idProdServ, keyType) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Eliminar un producto y/o servicio";
        data.method = "DELETE";
        data.api = "/prodserv/:id";
        data.process = "Eliminar un producto y/o servicio de la coleccion de cat_prod_serv";

        let query = {};

        if (keyType === "IdInstitutoOK") {
            query = {IdInstitutoOK: idProdServ};
        } else if (keyType === "IdProdServOK") {
            query = {IdProdServOK: idProdServ};
        } else {
            throw new Error(data.messageDEV);
        }

        const ProdServDeleted = await prodServs
            .findOneAndDelete(query)
            .then((prodServ) => {
                if (!prodServ) {
                    data.status = 400;
                    data.messageDEV =
                        "La eliminacion del producto y/o servicio en la base de datos <<NO>> tuvo exito";
                    throw Error(data.messageDEV);
                }

                return prodServ;
            });

        //data.status = 200;
        data.messageUSR =
            "La eliminacion del producto y/o servicio en la base de datos <<SI>> tuvo exito";
        data.dataRes = ProdServDeleted;
        bitacora = AddMSG(bitacora, data, "OK", 200, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let {message} = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR =
            "La eliminacion del producto y/o servicio en la base de datos <<NO>> tuvo exito";
        bitacora = AddMSG(bitacora, data, "FAIL");

        return FAIL(bitacora);
    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};
