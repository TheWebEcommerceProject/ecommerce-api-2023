import { Router } from 'express';
import * as prodServController from '../controllers/prodserv.controller';

const router = Router();

//ficRouter.get('/list', ProdServController.getProdServList);
router.get('/', prodServController.getProdServList);

//router.get('/item/:ficIdProdServ', prodServController.getProdServItem);
router.get('/:id', prodServController.getProdServItem);

router.put('/:id', prodServController.putProdServItem);

//Para borrar un documento
router.delete('/:id', prodServController.deleteProdServItem);

//Para insertar un nuevo documento
router.post('/', prodServController.postProdServItem);

//FIC: route add many persons for web/pwa
//BORRAR EN CASO DE QUE NO SE USE
router.post('/many-pwa', prodServController.addManyPersonsPWA);

export default router;
