import express from 'express';
import { vistaDeportes } from '../controller/tareasHandler.js';

const router = express.Router();

router.get('/', vistaDeportes )

export default router;