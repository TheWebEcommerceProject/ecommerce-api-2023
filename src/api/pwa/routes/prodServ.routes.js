import {Router} from "express";
import * as prodServController from "../controllers/prodServ.controller";

const router = Router();

// Este bloque crece por cada nueva API relacionada con eCommerce que agreguemos.

// GET
router.get("/", prodServController.getProdServAll);
router.get("/:id", prodServController.getProdServOne);

// POST
router.post("/", prodServController.addProdServ);

// PUT
router.put("/:id", prodServController.updateProdServ);

// DELETE
router.delete("/:id", prodServController.deleteProdServ);

export default router;
