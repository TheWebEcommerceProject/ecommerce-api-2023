import * as institutesServices from '../services/institutes.service';

////////////////////////////////////////////////////
// *********** GET SECTION INSTITUTES *********** //
////////////////////////////////////////////////////

// GET ALL INSTITUTES
export const getInstitutesAll = async (req, res, next) => {
    try {
        const institutesAll = await institutesServices.getInstitutesAll();
        if (institutesAll) {
            return res.status(institutesAll.status).json(institutesAll);
        }
    } catch (error) {
        next(error)
    }
}

/////////////////////////////////////////////////////
// *********** POST SECTION INSTITUTES *********** //
/////////////////////////////////////////////////////

// ADD INSTITUTES
export const addInstitutes = async (req, res, next) => {
    try {
        const InstituteAdded = await institutesServices.addInstitutes(req.body);
        if (InstituteAdded) {
            return res.status(InstituteAdded.status).json(InstituteAdded);
        }
    } catch (error) {
        next(error)
    }
}

/////////////////////////////////////////////////////
// *********** PUT SECTION INSTITUTES *********** //
/////////////////////////////////////////////////////

// UPDATE INSTITUTES
export const putInstitutes = async (req, res, next) => {
    try {

        const { id } = req.params;

        const InstituteUpdated = await institutesServices.putInstitutes(id, req.body);
        if (InstituteUpdated) {
            return res.status(InstituteUpdated.status).json(InstituteUpdated);
        }
    } catch (error) {
        next(error)
    }
}

/////////////////////////////////////////////////////
// *********** DELETE SECTION INSTITUTES *********** //
/////////////////////////////////////////////////////

// DELETE INSTITUTES
export const deleteInstitutes = async (req, res, next) => {
    try {
        const InstituteDeleted = await institutesServices.deleteInstitutes(req.params);
        if (InstituteDeleted) {
            return res.status(InstituteDeleted.status).json(InstituteDeleted);
        }
    } catch (error) {
        next(error)
    }
}