const router = require('express').Router();
const controller = require('../database/controller.js');

router.get('/holidays', controller.get);
router.post('/holidays', controller.add);

module.exports = router;