import * as mongoose from "mongoose";

// eCommerce
const prodservSchema = new mongoose.Schema({
    IdInstitutoOK: {type: String, required: true},
    IdProdServOK: {type: String},
    IdProdServBK: {type: String},
    CodigoBarras: {type: String},
    DesProdServ: {type: String},
    Indice: {type: String},
    cat_prod_serv_estatus: [
        {
            _id: false,
            IdEstatusOK: {type: String},
            Estatus: {type: String},
            Actual: {type: String},
            Observacion: {type: String},
            detail_row: {
                Activo: {type: String},
                Borrado: {type: String},
                detail_row_reg: [
                    {
                        FechaReg: {
                            $date: {type: Date, default: Date.now}
                        },
                        UsuarioReg: {type: String},
                    },
                ],
            },
        },
    ],
    cat_prod_serv_info_ad: [
        {
            _id: false,
            IdEtiquetaOK: {type: String},
            Valor: {type: String},
            detail_row: {
                Activo: {type: String},
                Borrado: {type: String},
                detail_row_reg: [
                    {
                        FechaReg: {
                            $date: {type: Date, default: Date.now}
                        },
                        UsuarioReg: {type: String},
                    },
                ],
            },
        },
    ],
    cat_prod_serv_presenta: [
        {
            _id: false,
            IdPresentaOK: {type: String},
            IdPresentaBK: {type: String},
            DesPresenta: {type: String},
            cat_prod_serv_info_vta: [
                {
                    _id: false,
                    IdEtiquetaOK: {type: String},
                    Valor: {type: String},
                    detail_row: {
                        Activo: {type: String},
                        Borrado: {type: String},
                        detail_row_reg: [
                            {
                                FechaReg: {
                                    $date: {type: Date, default: Date.now}
                                },
                                UsuarioReg: {type: String},
                            },
                        ],
                    },
                },
            ],
            cat_prod_serv_info_ad: [
                {
                    _id: false,
                    IdEtiquetaOK: {type: String},
                    Valor: {type: String},
                    detail_row: {
                        Activo: {type: String},
                        Borrado: {type: String},
                        detail_row_reg: [
                            {
                                FechaReg: {
                                    $date: {type: Date, default: Date.now}
                                },
                                UsuarioReg: {type: String},
                            },
                        ],
                    },
                },
            ],
            cat_prod_serv_archivos: [
                {
                    _id: false,
                    IdArchivoOK: {type: String},
                    IdArchivoBK: {type: String},
                    DesArchivo: {type: String},
                    RutaArchivo: {type: String},
                    IdTipoArchivoOK: {type: String},
                    Archivo: {type: String},
                    IdSeccionOK: {type: String},
                    Seccion: {type: String},
                    Secuencia: {type: Number},
                    Principal: {type: String},
                    VerSiempre: {type: String},
                    detail_row: {
                        Activo: {type: String},
                        Borrado: {type: String},
                        detail_row_reg: [
                            {
                                FechaReg: {
                                    $date: {type: Date, default: Date.now}
                                },
                                UsuarioReg: {type: String},
                            },
                        ],
                    },
                },
            ],
        },
    ],
    cat_prod_serv_negocios: [
        {
            _id: false,
            IdNegocioOK: {type: String},
        },
    ],
    detail_row: {
        Activo: {type: String},
        Borrado: {type: String},
        detail_row_reg: [
            {
                FechaReg: {
                    $date: {type: Date, default: Date.now}
                },
                UsuarioReg: {type: String},
            },
        ],
    },
}, {versionKey: false});

export default mongoose.model(
    'cat_prod_serv',
    prodservSchema,
    'cat_prod_serv'
);
