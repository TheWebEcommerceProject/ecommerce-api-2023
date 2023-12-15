import {Router} from "express";
import * as prodServController from "../controllers/productos.controller";

const router = Router();

// Este bloque crece por cada nueva API relacionada con eCommerce que agreguemos.

// GET
router.get("/", prodServController.GetAllProdServ);
router.get("/one?", prodServController.GetOneProdServ);

// POST
router.post("/import", prodServController.AddOneProdServ);

// PUT
router.put("/import", prodServController.UpdateOneProdServ);

// DELETE
router.delete("/import", prodServController.DeleteOneProdServ);

export default router;
