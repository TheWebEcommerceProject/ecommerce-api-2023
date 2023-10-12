import mongoose from "mongoose";
import config from "./config";

const crearModelo = (nombre, schema, conexion) => {
    return conexion.model(nombre, schema, nombre)
}

const obtenerModelo = (nombre, schema, conexion, dbName, dbCluster) => {
    let message = '';
    let model;

    if (conexion.modelNames().includes(nombre)) {
        model = conexion.model(nombre);

        message = dbName + '.' + nombre;
        console.log('FIC: CREATE COLLECTION: ======> ' + message);
    } else {
        model = crearModelo(nombre, schema, conexion);

        message = dbName + '.' + nombre;
        console.log('FIC: OMITTED COLLECTION: ======> ' + message);
    }

    return model;
}

module.exports = obtenerModelo;