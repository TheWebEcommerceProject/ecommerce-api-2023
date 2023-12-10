import ProdServ from "../models/productos";
import { OK, FAIL, BITACORA, DATA, AddMSG } from "../../../middlewares/respPWA.handler";

////////////////////////////////////////////////////
// *********** GET SECTION eCOMMERCE *********** //
////////////////////////////////////////////////////

// GET ALL ProdServs
export const GetAllProdServ = async () => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Extraer todo el producto";

        const productsList = await ProdServ.find().then((res) => {
            if (!res) {
                data.process = 'Extraer todos los registros de la coleccion de Productos';
                data.status = 404;
                data.messageDEV = 'La base de datos no tiene configuración de Productos.';

                throw Error(data.messageDEV);
            }

            return res;
        });

        data = DATA();
        data.process = 'Extraer todos los registros de la coleccion de Productos';
        data.messageUSR = 'La extracción de Productos';
        data.dataRes = productsList;
        bitacora = AddMSG(bitacora, data, "OK", 200, true);
        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        if (!data.dataRes) data.dataRes = error;
        data.messageUSR =
            'La extracción de la Productos NO tuvo Exito.' +
            '\n' +
            'Any operations that already occurred as part of this transaction will be rolled back.';
        bitacora = AddMSG(bitacora, data, 'FAIL');
        return FAIL(bitacora);
    }
};

// GET ONE ProdServ
export const GetOneProdServ = async (params) => {
    let bitacora = BITACORA();
    let response = await GetOneProdServMethod(bitacora, params);

    return response;
};

/////////////////////////////////////////////////////
// *********** POST SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

// ADD NEW ProdServ
export const AddOneProdServ = async (producto) => {
    let bitacora = BITACORA();
    let response = AddOneProdServMethod(bitacora, producto);

    return response;
};

/////////////////////////////////////////////////////
// *********** PUT SECTION eCOMMERCE *********** //
////////////////////////////////////////////////////

// UPDATE ONE ProdServ
export const UpdateOneProdServ = async (params, nuevosDatos) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Actualizar un Producto o Servicio";
        data.method = "PUT";
        data.api = `/cat-prod-serv`;
        data.process = "Actualizar la informacion de un Producto/Servicio en la base de datos";

        // Apis del Prof
        const pagoActualizado = await ProdServ.findOneAndUpdate({
            IdInstitutoOK: params.IdInstitutoOK,
            IdProdServOK: params.IdProdServOK
        }, nuevosDatos, { new: true });

        if (!pagoActualizado) {
            data.status = 404;
            data.messageDEV = "El Producto/Servicio no se encontró en la base de datos";
            throw new Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = "El Producto/Servicio se ha actualizado con éxito";
        data.dataRes = pagoActualizado;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
		if (!data.dataRes) data.dataRes = error;
		data.messageUSR =
			'La Actualizacion del Producto/Servicio NO tuvo Exito.' +
			'\n' +
			'Any operations that already occurred as part of this transaction will be rolled back.';
		bitacora = AddMSG(bitacora, data, 'FAIL');
		return FAIL(bitacora);
    }
};

/////////////////////////////////////////////////////
// *********** DELETE SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

// DELETE ONE ProdServ
export const DeleteOneProdServ = async (params) => {
  let bitacora = BITACORA();
  let response = DeleteProdServMethod(bitacora, params);

  return response;
};


/////////////////////////////////////////////////////
// *********** PATCH SECTION eCOMMERCE *********** //
/////////////////////////////////////////////////////

export const PatchOneProdServ = async (params, updateData) => {
	let bitacora = BITACORA();
	let response = PatchOneProdServMethod2(bitacora, params, updateData);

	return response;
};

////////////////////////////////////////////////// M E T H O D S /////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GetOneProdServMethod = async (bitacora, params) => {
	let data = DATA();
	try {

		//console.log("productId 222222",productId)

		bitacora.process = 'Extraer un Elemento del producto.';
		const productRes = await ProdServ
			.findOne({ IdInstitutoOK: params.IdInstitutoOK,
					   IdProdServOK: params.IdProdServOK }).then(
			(res) => {
				if (!res) {
					// data = DATA();
					data.process = 'Extraer todos los registros de la coleccion de Productos';
					data.status = 404;
					data.messageDEV = 'La base de datos no tiene configuración de Productos.';

					throw Error(data.messageDEV);
				}

				return res;
			}
		);

		data.process = 'Extraer todos los registros de la coleccion de Productos';
		data.messageUSR = 'La extracción de Productos';
		data.dataRes = productRes;
		bitacora = AddMSG(bitacora, data, 'OK', 200, true);
		return OK(bitacora);
	} catch (error) {
		//await localSession.abortTransaction();
		//console.log(data);
		if (!data.status) data.status = error.statusCode;
		if (!data.dataRes) data.dataRes = error;
		data.messageUSR =
			'La extracción de UN Producto NO tuvo Exito.' +
			'\n' +
			'Any operations that already occurred as part of this transaction will be rolled back.';
		bitacora = AddMSG(bitacora, data, 'FAIL');
		return FAIL(bitacora);
	}
};

export const AddOneProdServMethod = async (bitacora, producto) => {
	let data = DATA();
	try {
		bitacora.process = 'Agregar un producto.';
		data.process = 'Agregar un producto';
		data.method = 'POST';
		data.api = '/cat-prod-serv';

		const productoAdded = await ProdServ.insertMany(producto, { order: true }).then(
			(producto) => {
				if (!producto) {
					data.status = 400; //Boom.BadRequest()
					data.messageDEV = 'La inserción del producto NO fue exitoso.';
					throw Error(data.messageDEV);
				}

				return producto[0];
			}
		);

		data.messageUSR = 'La inserción del producto SI fue exitoso.';
		data.dataRes = productoAdded;
		bitacora = AddMSG(bitacora, data, 'OK', 201, true);
		return OK(bitacora);
	} catch (error) {
		if (!data.status) data.status = error.statusCode;

		let { message } = error;
		if (!data.messageDEV) data.messageDEV = message;
		if (data.dataRes.length === 0) data.dataRes = error;

		data.messageUSR =
			'La inserción del producto NO fue exitoso.' +
			'\n' +
			'Any operations that already occurred as part of this transaction will be rolled back.';
		bitacora = AddMSG(bitacora, data, 'FAIL');
		return FAIL(bitacora);
	}
};
  
export const PatchOneProdServMethod2 = async (bitacora, params, updateData) => {
	let data = DATA();
	try {
	  bitacora.process = 'Modificar un producto.';
	  data.process = 'Modificar un producto';
	  data.method = 'PATCH';
	  data.api = '/cat-prod-serv';
  
	  let productoUpdated = null;
  
	  // Encuentra el documento principal usando IdInstitutoOK, IdNegocioOK e IdPagoOK
	  const filter = {
		IdInstitutoOK: params.IdInstitutoOK,
		IdProdServOK: params.IdProdServOK
	  };
  
	  for (const key in updateData) {
			if (updateData.hasOwnProperty(key)) {
			const value = updateData[key];
	
			const updateQuery = { $set: { [key]: value } };
	
			try {
				productoUpdated = await ProdServ.findOneAndUpdate(
				filter,
				updateQuery,
				{ new: true }
				);
	
				if (!productoUpdated) {
				console.error("No se encontró un documento para actualizar con ese ID,", IdPagoOK);
				data.status = 400;
				data.messageDEV = 'La Actualización de un Subdocumento del producto NO fue exitoso.';
				throw new Error(data.messageDEV);
				}
			} catch (error) {
				console.error(error);
				data.status = 400;
				data.messageDEV = 'La Actualizacion de un Subdocumento del producto NO fue exitoso.';
				throw Error(data.messageDEV);
			}
			}
	  }
  
	  data.messageUSR = 'La Modificacion de los subdocumentos de producto SI fue exitoso.';
	  data.dataRes = productoUpdated;
	  bitacora = AddMSG(bitacora, data, 'OK', 201, true);
	  return OK(bitacora);
	} catch (error) {
	  console.error(error);
	  if (!data.status) data.status = error.statusCode;
	  let { message } = error;
	  if (!data.messageDEV) data.messageDEV = message;
	  if (data.dataRes.length === 0) data.dataRes = error;
	  data.messageUSR =
		'La Modificacionión del producto NO fue exitoso.' +
		'\n' +
		'Any operations that already occurred as part of this transaction will be rolled back.';
	  bitacora = AddMSG(bitacora, data, 'FAIL');
	  return FAIL(bitacora);
	}
  };


export const DeleteProdServMethod = async (bitacora, params) => {
	let data = DATA();
	try {
		bitacora.process = 'Eliminar un producto.';
		data.process = 'Eliminar un producto';
		data.method = 'DELETE';
		data.api = '/cat-prod-serv';

    	let productDeleted = null

		productDeleted = await ProdServ
			.findOneAndDelete({ IdInstitutoOK: params.IdInstitutoOK,
								IdProdServOK: params.IdProdServOK });

		if (!productDeleted) {
			console.error("No se encontró un documento para Eliminar con ese ID,",productId);
			data.status = 400;
			data.messageDEV = 'La Eliminacion de un Subdocumento del producto NO fue exitosa.';
			throw new Error(data.messageDEV);
		}


		data.messageUSR = 'La Modificacion de los subdocumentos de producto SI fue exitoso.';
		data.dataRes = productDeleted;
		bitacora = AddMSG(bitacora, data, 'OK', 201, true);
		return OK(bitacora);
	} catch (error) {
		console.error(error)
		if (!data.status) data.status = error.statusCode;

		let { message } = error;
		if (!data.messageDEV) data.messageDEV = message;
		if (data.dataRes.length === 0) data.dataRes = error;

		data.messageUSR =
			'La Eliminación del producto NO fue exitoso.' +
			'\n' +
			'Any operations that already occurred as part of this transaction will be rolled back.';
		bitacora = AddMSG(bitacora, data, 'FAIL');
		return FAIL(bitacora);
	}
};
 