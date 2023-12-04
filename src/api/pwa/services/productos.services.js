import prodServs from "../models/productos";
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

// GET ALL ProdServs
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
        let { message } = error;
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

// GET ONE ProdServ
export const getProdServOne = async (params) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Extraer uno de los productos y/o servicios";
        data.method = "GET";
        data.api = "/prodserv/one";
        data.process =
            "Extraer uno de los productos o servicios de la coleccion de cat_prod_serv";

        let query = {
            IdInstitutoOK: params.IdInstitutoOK,
            IdProdServOK: params.IdProdServOK,
        };

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
        let { message } = error;
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

// ADD NEW ProdServ
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
            .insertMany(newProdServ, { order: true })
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
        let { message } = error;
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

// ADD NEW ESTATUS ProdServ
export const addProdServEstatus = async (params, newCatProdServEstatus) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar un nuevo estado";
        data.method = "POST";
        data.api = "/estatus";
        data.process =
            "Agregar un nuevo estado en el documento.";

        let query = {
            IdInstitutoOK: params.IdInstitutoOK,
            IdProdServOK: params.IdProdServOK,
        };

        // Primero encontrar el documento que se quiere agregar el nuevo estatus
        const existingDocument = await prodServs.findOne(query);

        // Agregar el nuevo estatus al documento
        existingDocument.cat_prod_serv_estatus.push(newCatProdServEstatus);

        // Actualizar el documento con el nuevo estatus
        const ProdServAdded = await prodServs
            .findOneAndUpdate(query, existingDocument)
            .then((prodServ) => {
                if (!prodServ) {
                    data.status = 400;
                    data.messageDEV =
                        "La insercion del estado en el documento <<NO>> tuvo exito";
                    throw Error(data.messageDEV);
                }

                return prodServ;
            });

        //data.status = 200;
        data.messageUSR =
            "La insercion del estado en el documento <<SI>> tuvo exito";
        data.dataRes = ProdServAdded;
        bitacora = AddMSG(bitacora, data, "OK", 201, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR =
            "La insercion del estado en el documento <<NO>> tuvo exito";
        bitacora = AddMSG(bitacora, data, "FAIL");

        return FAIL(bitacora);
    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};

// ADD NEW INFOAD ProdServ
export const addInfoAd = async (params, newCatProdServInfoAd) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar nueva informacion adicional";
        data.method = "POST";
        data.api = "/infoad";
        data.process =
            "Agregar un nuevo infoad en el documento.";

        let query = {
            IdInstitutoOK: params.IdInstitutoOK,
            IdProdServOK: params.IdProdServOK,
        };

        // Primero encontrar el documento que se quiere agregar el nuevo estatus
        const existingDocument = await prodServs.findOne(query);

        // Agregar el nuevo estatus al documento
        existingDocument.cat_prod_serv_info_ad.push(newCatProdServInfoAd);

        // Actualizar el documento con el nuevo estatus
        const ProdServAdded = await prodServs
            .findOneAndUpdate(query, existingDocument)
            .then((prodServ) => {
                if (!prodServ) {
                    data.status = 400;
                    data.messageDEV =
                        "La insercion del infoad en el documento <<NO>> tuvo exito";
                    throw Error(data.messageDEV);
                }

                return prodServ;
            });

        //data.status = 200;
        data.messageUSR =
            "La insercion del infoad en el documento <<SI>> tuvo exito";
        data.dataRes = ProdServAdded;
        bitacora = AddMSG(bitacora, data, "OK", 201, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR =
            "La insercion del infoad en el documento <<NO>> tuvo exito";
        bitacora = AddMSG(bitacora, data, "FAIL");

        return FAIL(bitacora);
    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};

// ADD NEW PRESENTA ProdServ
export const addPresenta = async (params, newCatProdServPresenta) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar un nuevo subdocumento de presenta";
        data.method = "POST";
        data.api = "/presenta";
        data.process =
            "Agregar un nuevo subdocumento de presenta.";

        let query = {
            IdInstitutoOK: params.IdInstitutoOK,
            IdProdServOK: params.IdProdServOK,
        };

        // Primero encontrar el documento que se quiere agregar el nuevo estatus
        const existingDocument = await prodServs.findOne(query);

        // Agregar el nuevo estatus al documento
        existingDocument.cat_prod_serv_presenta.push(newCatProdServPresenta);

        // Actualizar el documento con el nuevo estatus
        const ProdServAdded = await prodServs
            .findOneAndUpdate(query, existingDocument)
            .then((prodServ) => {
                if (!prodServ) {
                    data.status = 400;
                    data.messageDEV =
                        "La insercion del subdocumento en el documento <<NO>> tuvo exito";
                    throw Error(data.messageDEV);
                }

                return prodServ;
            });

        //data.status = 200;
        data.messageUSR =
            "La insercion del subdocumento en el documento <<SI>> tuvo exito";
        data.dataRes = ProdServAdded;
        bitacora = AddMSG(bitacora, data, "OK", 201, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR =
            "La insercion del subdocumento en el documento <<NO>> tuvo exito";
        bitacora = AddMSG(bitacora, data, "FAIL");

        return FAIL(bitacora);
    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};

// ADD NEW PRESENTA INFOVTA ProdServ
export const addPresentaInfoVTA = async (params, newCatProdServPresentaInfoVTA) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar un nuevo subdocumento dentro del subdocumento de presenta";
        data.method = "POST";
        data.api = "/infovta";
        data.process = "Agregar un nuevo subdocumento de InfoVTA en el subdocumento de presenta.";

        let query = {
            IdInstitutoOK: params.IdInstitutoOK,
            IdProdServOK: params.IdProdServOK,
        };

        // Primero encontrar el documento que se requiere agregar el nuevo subdocumento
        const existingDocument = await prodServs.findOne(query);

        //Filtrar para conocer el indice del subdocumento
        const index = existingDocument.cat_prod_serv_presenta.findIndex(
            (presenta) => presenta.IdPresentaOK === params.IdPresentaOK && presenta.IdPresentaBK === params.IdPresentaBK
        );

        // Agregar el nuevo subdocumento al documento encontrado
        existingDocument.cat_prod_serv_presenta[index].cat_prod_serv_info_vta.push(newCatProdServPresentaInfoVTA);

        // Actualizar el documento con el nuevo subdocumento
        const ProdServAdded = await prodServs.findOneAndUpdate(query, existingDocument).then((prodServ) => {
            if (!prodServ) {
                data.status = 400;
                data.messageDEV = "La insercion del subdocumento en el documento <<NO>> tuvo exito";
                throw Error(data.messageDEV);
            }
            return prodServ;
        });

        data.messageUSR = "La insercion del subdocumento en el documento <<SI>> tuvo exito";
        data.dataRes = ProdServAdded;
        bitacora = AddMSG(bitacora, data, "OK", 201, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR = "La insercion del subdocumento en el documento <<NO>> tuvo exito";
        bitacora = AddMSG(bitacora, data, "FAIL");

        return FAIL(bitacora);
    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};

// ADD NEW PRESENTA INFOAD ProdServ
export const addPresentaInfoAD = async (params, newCatProdServPresentaInfoAD) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar un nuevo subdocumento dentro del subdocumento de presenta";
        data.method = "POST";
        data.api = "/InfoAD";
        data.process = "Agregar un nuevo subdocumento de InfoAD en el subdocumento de presenta.";

        let query = {
            IdInstitutoOK: params.IdInstitutoOK,
            IdProdServOK: params.IdProdServOK,
        };

        // Primero encontrar el documento que se requiere agregar el nuevo subdocumento
        const existingDocument = await prodServs.findOne(query);

        //Filtrar para conocer el indice del subdocumento
        const index = existingDocument.cat_prod_serv_presenta.findIndex(
            (presenta) => presenta.IdPresentaOK === params.IdPresentaOK && presenta.IdPresentaBK === params.IdPresentaBK
        );

        // Agregar el nuevo subdocumento al documento encontrado
        existingDocument.cat_prod_serv_presenta[index].cat_prod_serv_info_ad.push(newCatProdServPresentaInfoAD);

        // Actualizar el documento con el nuevo subdocumento
        const ProdServAdded = await prodServs.findOneAndUpdate(query, existingDocument).then((prodServ) => {
            if (!prodServ) {
                data.status = 400;
                data.messageDEV = "La insercion del subdocumento en el subdocumento de PRESENTA <<NO>> tuvo exito";
                throw Error(data.messageDEV);
            }
            return prodServ;
        });

        data.messageUSR = "La insercion del subdocumento en el subdocumento de PRESENTA <<SI>> tuvo exito";
        data.dataRes = ProdServAdded;
        bitacora = AddMSG(bitacora, data, "OK", 201, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR = "La insercion del subdocumento en el subdocumento  de PRESENTA <<NO>> tuvo exito";
        bitacora = AddMSG(bitacora, data, "FAIL");

        return FAIL(bitacora);
    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};

// ADD NEW PRESENTA ARCHIVOS ProdServ
export const addPresentaArchivos = async (params, newCatProdServPresentaArchivos) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar un nuevo subdocumento dentro del subdocumento de presenta";
        data.method = "POST";
        data.api = "/Archivos";
        data.process = "Agregar un nuevo subdocumento de Archivos en el subdocumento de presenta.";

        let query = {
            IdInstitutoOK: params.IdInstitutoOK,
            IdProdServOK: params.IdProdServOK,
        };

        // Primero encontrar el documento que se requiere agregar el nuevo subdocumento
        const existingDocument = await prodServs.findOne(query);

        //Filtrar para conocer el indice del subdocumento
        const index = existingDocument.cat_prod_serv_presenta.findIndex(
            (presenta) => presenta.IdPresentaOK === params.IdPresentaOK && presenta.IdPresentaBK === params.IdPresentaBK
        );

        // Agregar el nuevo subdocumento al documento encontrado
        existingDocument.cat_prod_serv_presenta[index].cat_prod_serv_archivos.push(newCatProdServPresentaArchivos);

        // Actualizar el documento con el nuevo subdocumento
        const ProdServAdded = await prodServs.findOneAndUpdate(query, existingDocument).then((prodServ) => {
            if (!prodServ) {
                data.status = 400;
                data.messageDEV = "La insercion del subdocumento en el subdocumento de PRESENTA <<NO>> tuvo exito";
                throw Error(data.messageDEV);
            }
            return prodServ;
        });

        data.messageUSR = "La insercion del subdocumento en el subdocumento de PRESENTA <<SI>> tuvo exito";
        data.dataRes = ProdServAdded;
        bitacora = AddMSG(bitacora, data, "OK", 201, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR = "La insercion del subdocumento en el subdocumento  de PRESENTA <<NO>> tuvo exito";
        bitacora = AddMSG(bitacora, data, "FAIL");

        return FAIL(bitacora);
    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};

// ADD NEW NEGOCIO ProdServ
export const addNegocios = async (params, newCatProdServNegocio) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar un nuevo subdocumento de presenta";
        data.method = "POST";
        data.api = "/negocio";
        data.process =
            "Agregar un nuevo subdocumento de presenta.";

        let query = {
            IdInstitutoOK: params.IdInstitutoOK,
            IdProdServOK: params.IdProdServOK,
        };

        // Primero encontrar el documento que se quiere agregar el nuevo estatus
        const existingDocument = await prodServs.findOne(query);

        // Agregar el nuevo estatus al documento
        existingDocument.cat_prod_serv_negocios.push(newCatProdServNegocio);

        // Actualizar el documento con el nuevo estatus
        const ProdServAdded = await prodServs
            .findOneAndUpdate(query, existingDocument)
            .then((prodServ) => {
                if (!prodServ) {
                    data.status = 400;
                    data.messageDEV =
                        "La insercion del subdocumento en el documento <<NO>> tuvo exito";
                    throw Error(data.messageDEV);
                }

                return prodServ;
            });

        //data.status = 200;
        data.messageUSR =
            "La insercion del subdocumento en el documento <<SI>> tuvo exito";
        data.dataRes = ProdServAdded;
        bitacora = AddMSG(bitacora, data, "OK", 201, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR =
            "La insercion del subdocumento en el documento <<NO>> tuvo exito";
        bitacora = AddMSG(bitacora, data, "FAIL");

        return FAIL(bitacora);
    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};

/////////////////////////////////////////////////////
// *********** PUT SECTION eCOMMERCE *********** //
////////////////////////////////////////////////////

// UPDATE ONE ProdServ
export const updateProdServ = async (body, params) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Modificar un producto y/o servicio";
        data.method = "PUT";
        data.api = "/prodserv";
        data.process = "Modificar un producto y/o servicio de la coleccion de cat_prod_Serv";

        let query = {
            IdInstitutoOK: params.IdInstitutoOK,
            IdProdServOK: params.IdProdServOK,
        };

        const ProdServUpdated = await prodServs
            .findOneAndUpdate(query, body)
            .then((institute) => {
                if (!institute) {
                    data.status = 404;
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
        let { message } = error;
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

// DELETE ONE ProdServ
export const deleteProdServ = async (params) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Eliminar un producto y/o servicio";
        data.method = "DELETE";
        data.api = "/prodserv";
        data.process = "Eliminar un producto y/o servicio de la coleccion de cat_prod_serv";

        let query = {
            IdInstitutoOK: params.IdInstitutoOK,
            IdProdServOK: params.IdProdServOK,
        };

        const ProdServDeleted = await prodServs
            .findOneAndDelete(query)
            .then((prodServ) => {
                if (!prodServ) {
                    data.status = 404;
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
        let { message } = error;
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

/////////////////////////////////////////////////////
// *********** PATCH SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

export const patchProdServ = async (informacionActualizada, params) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Actualizar parcialmente un producto y/o servicio";
        data.method = "PATCH";
        data.api = "/patch";
        data.process = "Actualizar parcialmente un producto y/o servicio de la coleccion de cat_prod_serv";

        let query = {
            IdInstitutoOK: params.IdInstitutoOK,
            IdProdServOK: params.IdProdServOK,
        };

        //Buscar el documento
        const product = await prodServs.findOne(query);

        //Realizacion la actualizacion parcial del documento
        Object.assign(product, informacionActualizada);

        const ProdServUpdated = await prodServs.findOneAndUpdate(query, product, { new: true }).then((product) => {
            if (!product) {
                data.status = 404;
                data.messageDEV = "La actualizacion parcial del producto y/o servicio en la base de datos <<NO>> tuvo exito";
                throw Error(data.messageDEV);
            }
            return product;
        });

        data.messageUSR = "La actualizacion parcial del producto y/o servicio en la base de datos <<SI>> tuvo exito";
        data.dataRes = ProdServUpdated;
        bitacora = AddMSG(bitacora, data, "OK", 200, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;

        data.messageUSR =
            "La actualizacion parcial del producto y/o servicio en la base de datos <<NO>> tuvo exito";
        bitacora = AddMSG(bitacora, data, "FAIL");

        return FAIL(bitacora);
    } finally {
        //Haya o no haya error se ejecuta el finally
    }
};