import { Router } from "express";
import * as institutesController from "../controllers/institutes.controller";

const router = Router();

// Este bloque crece por cada nueva API relacionada con institutos que tu agregues.

// GET
router.get("/", institutesController.getInstitutesAll);

// POST
router.post("/", institutesController.addInstitutes);

// PUT
router.put("/:id", institutesController.putInstitutes);

// DELETE
router.delete("/:id", institutesController.deleteInstitutes);

export default router;