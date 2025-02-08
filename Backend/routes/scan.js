const express= require('express');
const { scan }= require('../controllers/scanController');
const { authenticate }= require('../middleware/auth');

const router = express.Router();

router.post('/scan', authenticate, scan);

module.exports= router;