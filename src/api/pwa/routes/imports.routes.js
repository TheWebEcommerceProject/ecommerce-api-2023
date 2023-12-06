import {Router} from "express";
import * as importsController from "../controllers/imports.controller";

const router = Router();

// Este bloque crece por cada nueva API relacionada con eCommerce que agreguemos.

// PATCH
router.patch("/import/patch", importsController.PatchProdServ);

export default router;