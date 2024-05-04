import express from 'express';
import { vistaAgregar } from '../controller/tareasHandler.js';

const router = express.Router();

router.post('/', vistaAgregar )

export default router;