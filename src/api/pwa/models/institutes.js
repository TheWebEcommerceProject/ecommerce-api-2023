import * as mongoose from 'mongoose';
import config from '../../../config/config';
import obtenerConexion from '../../../config/connectionsFactory';
import obtenerModelo from '../../../config/modelsFactory';


const institutesSchemaPWA = new mongoose.Schema({
	IdInstitutoOK: { type: String },
	IdInstitutoBK: { type: String },
	IdInstitutoSupOK: { type: String },
	DesInstituto: { type: String },
	Alias: { type: String },
	Matriz: { type: String },
	IdTipoGiroOK: { type: String },
	cat_negocios: [
		{
			_id: false,
			IdNegocioOK: { type: String },
			IdNegocioBK: { type: String },
			IdNegocioSupOK: { type: String },
			DesNegocio: { type: String },
			Alias: { type: String },
			Matriz: { type: String },
			info_ad: [
				{
					_id: false,
					IdEtiquetaOK: { type: String },
					IdEtiqueta: { type: String },
					Etiqueta: { type: String },
					Valor: { type: String },
					IdTipoSeccionOK: { type: String },
					Secuencia: { type: Number },
					detail_row: {
						_id: false,
						Activo: { type: String, default: 'S' },
						Borrado: { type: String, default: 'N' },
						detail_row_reg: [
							{
								_id: false,
								FechaReg: { type: Date, default: Date.now() },
								UsuarioReg: { type: String, default: 'SYSTEM' }
							}
						]
					}
				}
			],
			archivos: [
				{
					_id: false,
					IdArchivoBK: { type: String },
					DesArchivo: { type: String },
					RutaArchivo: { type: String },
					IdTipoArchivoOK: { type: String },
					IdTipoSeccionOK: { type: String },
					Secuencia: { type: Number },
					Principal: { type: String },
					detail_row: {
						_id: false,
						Activo: { type: String, default: 'S' },
						Borrado: { type: String, default: 'N' },
						detail_row_reg: [
							{
								_id: false,
								FechaReg: { type: Date, default: Date.now },
								UsuarioReg: { type: String, default: 'SYSTEM' }
							}
						]
					}
				}
			],
			telefonos: [
				{
					_id: false,
					DesTelefono: { type: String },
					CodPais: { type: String },
					NumTelefono: { type: String },
					NumExtension: { type: String },
					Principal: { type: String },
					IdTipoTelefonoOK: { type: String },
					detail_row: {
						_id: false,
						Activo: { type: String, default: 'S' },
						Borrado: { type: String, default: 'N' },
						detail_row_reg: [
							{
								_id: false,
								FechaReg: { type: Date, default: Date.now },
								UsuarioReg: { type: String, default: 'SYSTEM' }
							}
						]
					}
				}
			],
			dir_webs: [
				{
					_id: false,
					DesDirWeb: { type: String },
					DireccionWeb: { type: String },
					IdTipoDirWebOK: { type: String },
					Principal: { type: String },
					detail_row: {
						_id: false,
						Activo: { type: String, default: 'S' },
						Borrado: { type: String, default: 'N' },
						detail_row_reg: [
							{
								_id: false,
								FechaReg: { type: Date, default: Date.now },
								UsuarioReg: { type: String, default: 'SYSTEM' }
							}
						]
					}
				}
			],
			domicilios: [
				{
					_id: false,
					DesDomicilio: { type: String },
					CalleNumero: { type: String },
					EntreCalle1: { type: String },
					EntreCalle2: { type: String },
					Referencia: { type: String },
					CodPostal: { type: String },
					Principal: { type: String },
					CoordenadasXY: { type: String },
					IdTipoDomicilioOK: { type: String },
					Pais: { type: String },
					Estado: { type: String },
					Municipio: { type: String },
					Localidad: { type: String },
					Colonia: { type: String },
					detail_row: {
						_id: false,
						Activo: { type: String, default: 'S' },
						Borrado: { type: String, default: 'N' },
						detail_row_reg: [
							{
								_id: false,
								FechaReg: { type: Date, default: Date.now },
								UsuarioReg: { type: String, default: 'SYSTEM' }
							}
						]
					}
				}
			],
			detail_row: {
				_id: false,
				Activo: { type: String, default: 'S' },
				Borrado: { type: String, default: 'N' },
				detail_row_reg: [
					{
						_id: false,
						FechaReg: { type: Date, default: Date.now },
						UsuarioReg: { type: String, default: 'SYSTEM' }
					}
				]
			}
		}
	],
	detail_row: {
		_id: false,
		Activo: { type: String, default: 'S' },
		Borrado: { type: String, default: 'N' },
		detail_row_reg: [
			{
				_id: false,
				FechaReg: { type: Date, default: Date.now() },
				UsuarioReg: { type: String, default: 'SYSTEM' }
			}
		]
	}
});


//FIC: *******************************************************************
const dbName = config.DATABASE;
const dbCluster = config.CLUSTER;

const conn = obtenerConexion(dbName, dbCluster);

const model = obtenerModelo('cat_institutos',
	institutesSchemaPWA,
	conn,
	dbName,
	dbCluster);

export default model;

/* export default mongoose.model(
	'cat_institutos',
	config.PLATFORM==='PWA' ? institutesSchemaPWA : institutesSchemaWEB,
	'cat_institutos'
);
 */
