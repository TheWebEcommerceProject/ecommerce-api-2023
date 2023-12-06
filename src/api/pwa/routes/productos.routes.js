import {Router} from "express";
import * as prodServController from "../controllers/productos.controller";

const router = Router();

// Este bloque crece por cada nueva API relacionada con eCommerce que agreguemos.

// GET
router.get("/", prodServController.getAllProdServ);
router.get("/one", prodServController.getOneProdServ);

// POST
router.post("/import", prodServController.addOneProdServ);

// PUT
router.put("/import", prodServController.updateOneProdServ);

// DELETE
router.delete("/import", prodServController.deleteOneProdServ);

export default router;
