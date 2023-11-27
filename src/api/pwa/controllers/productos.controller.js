import * as prodServServices from "../services/productos.services";

////////////////////////////////////////////////////
// *********** GET SECTION eCOMMERCE *********** //
////////////////////////////////////////////////////

// GET ALL eCOMMERCE
export const getProdServAll = async (req, res, next) => {
    try {
        const ProdServAll = await prodServServices.getProdServAll();
        if (ProdServAll) {
            return res.status(ProdServAll.status).json(ProdServAll);
        }
    } catch (error) {
        next(error);
    }
};

// GET ONE eCOMMERCE
export const getProdServOne = async (req, res, next) => {
    try {

        const params = req.query;

        const ProdServOne = await prodServServices.getProdServOne(params);

        if (ProdServOne) {
            return res.status(ProdServOne.status).json(ProdServOne);
        }
    } catch (error) {
        next(error);
    }
};

/////////////////////////////////////////////////////
// *********** POST SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

// ADD eCOMMERCE
export const addProdServ = async (req, res, next) => {
    try {
        const ProdServAdded = await prodServServices.addProdServ(req.body);
        if (ProdServAdded) {
            return res.status(ProdServAdded.status).json(ProdServAdded);
        }
    } catch (error) {
        next(error);
    }
};

// ADD ESTATUS eCOMMERCE
export const addProdServEstatus = async (req, res, next) => {
    try {

        const params = req.query;
        const body = req.body;

        const ProdServAdded = await prodServServices.addProdServEstatus(params, body);
        if (ProdServAdded) {
            return res.status(ProdServAdded.status).json(ProdServAdded);
        }
    } catch (error) {
        next(error);
    }
};

/////////////////////////////////////////////////////
// *********** PUT SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

// UPDATE eCOMMERCE
export const updateProdServ = async (req, res, next) => {
    try {

        const params = req.query;
        const body = req.body;

        const ProdServUpdated = await prodServServices.updateProdServ(body, params);
        if (ProdServUpdated) {
            return res.status(ProdServUpdated.status).json(ProdServUpdated);
        }
    } catch (error) {
        next(error);
    }
};

/////////////////////////////////////////////////////
// *********** DELETE SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

// DELETE eCOMMERCE
export const deleteProdServ = async (req, res, next) => {
    try {

        const params = req.query;

        const ProdServDeleted = await prodServServices.deleteProdServ(params);
        if (ProdServDeleted) {
            return res.status(ProdServDeleted.status).json(ProdServDeleted);
        }
    } catch (error) {
        next(error);
    }
};
