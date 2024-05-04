import express from 'express';
import { vistaIndex } from '../controller/vistaIndex.js';

const router = express.Router();

router.get('/', vistaIndex )

export default router