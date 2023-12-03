import {Router} from "express";
import * as prodServController from "../controllers/productos.controller";

const router = Router();

// Este bloque crece por cada nueva API relacionada con eCommerce que agreguemos.

// GET
router.get("/", prodServController.getProdServAll);
router.get("/one", prodServController.getProdServOne);

// POST
router.post("/", prodServController.addProdServ);
router.post("/estatus", prodServController.addProdServEstatus);
router.post("/infoad", prodServController.addInfoAd);
router.post("/presenta", prodServController.addPresenta);
router.post("/presenta/infovta", prodServController.addPresentaInfoVTA);

// PUT
router.put("/", prodServController.updateProdServ);

// DELETE
router.delete("/", prodServController.deleteProdServ);

// PATCH
router.patch("/patch", prodServController.patchProdServ);

export default router;
