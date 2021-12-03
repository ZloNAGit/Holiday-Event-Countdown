const router = require('express').Router();
const controller = require('../database/controller.js');

router.get('/holidays', controller.get);
router.post('/holidays', controller.add);
router.delete('/holidays', controller.delete);

module.exports = router;