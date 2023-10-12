import * as prodServServices from "../services/prodServ.service";

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

/////////////////////////////////////////////////////
// *********** PUT SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

// UPDATE eCOMMERCE
export const putProdServ = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ProdServUpdated = await prodServServices.putProdServ(id, req.body);
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
    const ProdServDeleted = await prodServServices.deleteProdServ(req.params);
    if (ProdServDeleted) {
      return res.status(ProdServDeleted.status).json(ProdServDeleted);
    }
  } catch (error) {
    next(error);
  }
};
