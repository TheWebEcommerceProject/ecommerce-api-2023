import boom from '@hapi/boom';
import * as prodServServices from "../services/productos.services";

////////////////////////////////////////////////////
// *********** GET SECTION eCOMMERCE *********** //
////////////////////////////////////////////////////

// GET ALL eCOMMERCE
export const GetAllProdServ = async (req, res, next) => {
    try {
        const ProdServAll = await prodServServices.GetAllProdServ();
        if (ProdServAll) {
            return res.status(ProdServAll.status).json(ProdServAll);
        }
    } catch (error) {
        next(error);
    }
};

// GET ONE eCOMMERCE
export const GetOneProdServ = async (req, res, next) => {
    try {

        const params = req.query;

        const ProdServOne = await prodServServices.GetOneProdServ(params);

        if (ProdServOne) {
            return res.status(ProdServOne.status).json(ProdServOne);
        }
    } catch (error) {
        next(boom.badImplementation(error));
    }
};

/////////////////////////////////////////////////////
// *********** POST SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

// ADD eCOMMERCE
export const AddOneProdServ = async (req, res, next) => {
    try {
        const producto = req.body;
        const productAdded = await prodServServices.AddOneProdServ(producto);
        if (productAdded) {
            productAdded.session = null;
            return res.status(productAdded.status).json(productAdded);
        }
    } catch (error) {
        next(error);
    }
};

/////////////////////////////////////////////////////
// *********** PUT SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

// UPDATE eCOMMERCE
export const UpdateOneProdServ = async (req, res, next) => {
    try {
        //const productId = req.params.id;
        const params = req.query;
        const updateData = req.body;

        const productUpdated = await prodServServices.UpdateOneProdServ(params, updateData);
        if (productUpdated) {
            productUpdated.session = null;
            return res.status(productUpdated.status).json(productUpdated);
        }
    } catch (error) {
        next(error);
    }
};

/////////////////////////////////////////////////////
// *********** DELETE SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

// DELETE eCOMMERCE
export const DeleteOneProdServ = async (req, res, next) => {
    try {
        //const productId = req.params.id;
        const params = req.query;
        const productDeleted = await prodServServices.DeleteOneProdServ(params);
        if (productDeleted) {
            productDeleted.session = null;
            return res.status(productDeleted.status).json(productDeleted);
        }
    } catch (error) {
        next(error);
    }
};


/////////////////////////////////////////////////////
// *********** PATCH SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

export const PatchOneProdServ = async (req, res, next) => {
    try {

        //const { id } = req.params;
        const params = req.query;
        const body = req.body;
        //const keyType = req.query.keyType || 'OK';

        //const ProdServUpdated = await prodServServices.PatchOneProdServ(params, req.body, keyType);
        const ProdServUpdated = await prodServServices.PatchOneProdServ(params, body);

        if (ProdServUpdated) {
            return res.status(ProdServUpdated.status).json(ProdServUpdated);
        }
    } catch (error) {
        next(error);
    }
};