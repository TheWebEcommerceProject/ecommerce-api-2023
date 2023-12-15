import * as mongoose from "mongoose";
import config from "../../../config/config";
import obtenerConexion from "../../../config/connectionsFactory";
import obtenerModelo from "../../../config/modelsFactory";

const catProdServSchema = new mongoose.Schema({
    IdInstitutoOK: { type: String, required: true },
    IdProdServOK: { type: String, required: true },
    IdProdServBK: { type: String },
    CodigoBarras: { type: String },
    DesProdServ: { type: String },
    Indice: { type: String },
    cat_prod_serv_estatus: [
        {
            _id: false,
            IdTipoEstatusOK: { type: String },
            Actual: { type: String, default: 'S' },
            Observacion: { type: String },
            detail_row: {
                Activo: { type: String, default : 'S' },
                Borrado: { type: String, default : 'N' },
                detail_row_reg: [
                    {
                        _id: false,
                        FechaReg: { type: Date, default: Date.now() },
                        UsuarioReg: { type: String, default: 'SYSTEM' }  
                    },
                ],
            },
        },
    ],
    cat_prod_serv_info_ad: [
        {
            _id: false,
            IdEtiquetaOK: { type: String },
            IdEtiqueta: { type: String },
            Valor: { type: String },
            IdTipoSeccionOK:  { type: String },
			Secuencia: { type: Number },
            detail_row: {
                Activo: { type: String },
                Borrado: { type: String },
                detail_row_reg: [
                    {
                        _id: false,
                        FechaReg: { type: Date, default: Date.now() },
                        UsuarioReg: { type: String, default: 'SYSTEM' },
                        
                    },
                ],
            },
        },
    ],
    cat_prod_serv_presenta: [
        {
            _id: false,
            IdPresentaOK: { type: String },
            IdPresentaBK: { type: String },
            CodigoBarras: { type: String },
			DesPresenta: { type: String },
			Indice: { type: String },
            cat_prod_serv_info_vta: [
                {
                    _id: false,
                    IdEtiquetaOK: { type: String },
                    IdEtiqueta: { type: String },
					Valor:{ type: String },
					IdTipoSeccionOK: { type: String },
					Secuencia: { type: Number },
                    detail_row: {
                        Activo: { type: String, default: 'S' },
                        Borrado: { type: String, default: 'N' },
                        detail_row_reg: [
                            {
                                _id: false,
                                FechaReg: { type: Date, default: Date.now },
                                UsuarioReg: { type: String }
                                
                            },
                        ],
                    },
                },
            ],
            cat_prod_serv_info_add: [
                {
                    _id: false,
                    IdEtiquetaOK: { type: String },
                    IdEtiqueta: { type: String },
					Valor:{ type: String },
					IdTipoSeccionOK: { type: String },
					Secuencia: { type: Number },
                    detail_row: {
                        Activo: { type: String, default: 'S' },
                        Borrado: { type: String, default: 'N' },
                        detail_row_reg: [
                            {
                                FechaReg: { type: Date, default: Date.now },
                                UsuarioReg: { type: String },
                                _id: false,
                            },
                        ],
                    },
                },
            ],
            cat_prod_serv_paquete: [
                {
                    _id: false,
                    IdPresentaOK: { type: String },
                    DesPresenta: { type: String },
                    Cantidad: { type: Number },
                    detail_row : {
                        _id: false,
                        Activo  : { type : String, default : 'S' },
                        Borrado : { type : String, default : 'N' },
                        detail_row_reg : [
                            {
                                _id: false,
                                FechaReg   : { type : Date, default : Date.now() },
                                UsuarioReg : { type : String, default: 'SYSTEM' }
                            }
                        ]
                    },
                },
            ],
            cat_prod_serv_archivos: [
                {
                    _id: false,
                    IdArchivoOK: { type: String },
                    IdArchivoBK: { type: String },
                    DesArchivo: { type: String },
                    RutaArchivo: { type: String },
                    IdTipoArchivoOK: { type: String },
                    Archivo: { type: String },
                    IdTipoSeccionOK: { type: String },
                    Secuencia: { type: Number },
                    Principal: { type: String },
                    detail_row: {
                        Activo: { type: String, default : 'S' },
                        Borrado: { type: String, default : 'N' },
                        detail_row_reg: [
                            {
                                _id: false,
                                FechaReg: { type: Date, default: Date.now() },
                                UsuarioReg: { type: String, default: 'SYSTEM' }
                                
                            },
                        ],
                    },
                },
            ],
            detail_row : {
                _id: false,
                Activo  : { type : String, default : 'S' },
                Borrado : { type : String, default : 'N' },
                detail_row_reg : [
                    {
                        _id: false,
                        FechaReg   : { type : Date, default : Date.now() },
                        UsuarioReg : { type : String, default: 'SYSTEM' }
                    }
                ]
            },
        },
    ],
    cat_prod_serv_negocios: [
        {
            _id: false,
            IdNegocioOK: { type: String },
            detail_row: {
                _id: false,
                Activo: { type: String, default: 'S' },
                Borrado: { type: String, default: 'N' },
                detail_row_reg: [
                    {
                        _id: false,
                        FechaReg: { type: Date, default: Date.now },
                        UsuarioReg: { type: String },
                    },
                ],
            },
        }
    ],
    detail_row: {
        Activo: { type: String, default: 'S' },
        Borrado: { type: String, default: 'N' },
        detail_row_reg: [
            {
                FechaReg: { type: Date, default: Date.now() },
                UsuarioReg: { type: String, default: 'SYSTEM' },
                _id: false,
            },
        ],
    },
}, { versionKey: false });



//FIC: *******************************************************************
const dbName = config.DATABASE;
const dbCluster = config.CLUSTER;

const conn =  obtenerConexion(dbName, dbCluster);

const model = obtenerModelo(
                    "cat_prod_serv", 
                    catProdServSchema,
                    conn, 
                    dbName, 
                    dbCluster); 

export default model;