import * as prodServServices from "../services/productos.services";

////////////////////////////////////////////////////
// *********** GET SECTION eCOMMERCE *********** //
////////////////////////////////////////////////////

// GET ALL eCOMMERCE
export const getAllProdServ = async (req, res, next) => {
    try {
        const ProdServAll = await prodServServices.getAllProdServ();
        if (ProdServAll) {
            return res.status(ProdServAll.status).json(ProdServAll);
        }
    } catch (error) {
        next(error);
    }
};

// GET ONE eCOMMERCE
export const getOneProdServ = async (req, res, next) => {
    try {

        const params = req.query;

        const ProdServOne = await prodServServices.getOneProdServ(params);

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
export const addOneProdServ = async (req, res, next) => {
    try {
        const ProdServAdded = await prodServServices.addOneProdServ(req.body);
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
export const updateOneProdServ = async (req, res, next) => {
    try {

        const params = req.query;
        const body = req.body;

        const ProdServUpdated = await prodServServices.updateOneProdServ(body, params);
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
export const deleteOneProdServ = async (req, res, next) => {
    try {

        const params = req.query;

        const ProdServDeleted = await prodServServices.deleteOneProdServ(params);
        if (ProdServDeleted) {
            return res.status(ProdServDeleted.status).json(ProdServDeleted);
        }
    } catch (error) {
        next(error);
    }
};