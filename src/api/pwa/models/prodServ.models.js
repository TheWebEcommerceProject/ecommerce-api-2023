import * as mongoose from "mongoose";
import config from "../../../config/config";
import obtenerConexion from "../../../config/connectionsFactory";
import obtenerModelo from "../../../config/modelsFactory";

const prodServSchemaPWA = new mongoose.Schema({
  IdProdServPK: { type: Number, required: true },
  IdProdServOK: { type: String },
  IdProdServBK: { type: String },
  //--
  IdProdServMaOK: { type: String },
  IdProdServMaBK: { type: String },
  //--
  DesProdServ: { type: String },
  IdMedidaOK: { type: String },
  IdMedidaBK: { type: String },
  //FIC: ESTATUS
  cat_prod_serv_estatus: [
    {
      IdTipoGenEstatusOk: { type: String },
      IdGenEstatusOk: { type: String },
      TipoEstatus: { type: String },
      Actual: { type: String },
      Observacion: { type: String },
      detail_row: {
        FechaReg: { type: Date, default: Date.now },
        UsuarioReg: { type: String },
      },
      _id: false,
    },
  ],
  //FIC: ARCHIVOS
  cat_prod_serv_archivos: [
    {
      DesArchivo: { type: String },
      RutaArchivo: { type: String },
      //FIC: Tipo Archivo
      IdTipoGenArchivoOK: { type: String },
      IdGenArchivoOK: { type: String },
      TipoArchivo: { type: String },
      //FIC: Sección
      IdTipoGenSeccionOK: { type: String },
      IdGenSeccionOK: { type: String },
      TipoSeccion: { type: String },
      //---
      Secuencia: { type: Number },
      Principal: { type: String },
      detail_row: {
        FechaReg: { type: Date, default: Date.now },
        UsuarioReg: { type: String },
        FechaUltMod: { type: Date, default: Date.now },
        UsuarioMod: { type: String },
        Activo: { type: String, default: "S" },
        Borrado: { type: String, default: "N" },
        _id: false,
      },
      _id: false,
    },
  ],
  detail_row: {
    FechaReg: { type: Date, default: Date.now },
    UsuarioReg: { type: String },
    FechaUltMod: { type: Date, default: Date.now },
    UsuarioMod: { type: String },
    Activo: { type: String, default: "S" },
    Borrado: { type: String, default: "N" },
  },
});

// *******************************************************************
const dbName = config.DATABASE;
const dbCluster = config.CLUSTER;

const conn = obtenerConexion(dbName, dbCluster);

const model = obtenerModelo(
  "cat_prod_serv",
  prodServSchemaPWA,
  conn,
  dbName,
  dbCluster
);

export default model;

/* export default mongoose.model(
	'cat_institutos',
	config.PLATFORM==='PWA' ? institutesSchemaPWA : institutesSchemaWEB,
	'cat_institutos'
);
 */
