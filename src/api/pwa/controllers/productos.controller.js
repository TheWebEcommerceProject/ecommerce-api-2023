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
        next(error);
    }
};

/////////////////////////////////////////////////////
// *********** POST SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

// ADD eCOMMERCE
export const AddOneProdServ = async (req, res, next) => {
    try {
        const ProdServAdded = await prodServServices.AddOneProdServ(req.body);
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
export const UpdateOneProdServ = async (req, res, next) => {
    try {

        const params = req.query;
        const body = req.body;

        const ProdServUpdated = await prodServServices.UpdateOneProdServ(body, params);
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
export const DeleteOneProdServ = async (req, res, next) => {
    try {

        const params = req.query;

        const ProdServDeleted = await prodServServices.DeleteOneProdServ(params);
        if (ProdServDeleted) {
            return res.status(ProdServDeleted.status).json(ProdServDeleted);
        }
    } catch (error) {
        next(error);
    }
};