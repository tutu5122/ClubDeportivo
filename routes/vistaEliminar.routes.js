import express from 'express';
import { vistaEliminar } from '../controller/tareasHandler.js';

const router = express.Router();

router.get('/', vistaEliminar )

export default router;