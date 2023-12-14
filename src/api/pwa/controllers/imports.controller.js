import * as ImportServices from "../services/imports.services";

/////////////////////////////////////////////////////
// *********** PATCH SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

export const PatchProdServ = async (req, res, next) => {
    try {
        // Desestructuramos el body y el query
        const {query, body} = req;
        // Llamamos al servicio y le pasamos los datos
        const productUpdated = await ImportServices.UpdateProduct(query, body);
        // Si el servicio nos responde con un producto actualizado, lo devolvemos
        if (productUpdated) {
            productUpdated.session = null;
            return res.status(productUpdated.status).json(productUpdated);
        }
    } catch (error) {
        next(error);
    }
};