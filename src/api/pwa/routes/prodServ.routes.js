import { Router } from "express";
import * as prodServController from "../controllers/prodServ.controller";

const router = Router();

// Este bloque crece por cada nueva API relacionada con eCommerce que agreguemos.

// GET
router.get("/", prodServController.getProdServAll);

// POST
router.post("/", prodServController.addProdServ);

// PUT
router.put("/:id", prodServController.putProdServ);

// DELETE
router.delete("/:id", prodServController.deleteProdServ);

export default router;