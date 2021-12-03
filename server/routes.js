const router = require('express').Router();
const controller = require('../database/controller.js');

router.get('/holidays', controller.get);
router.post('/', controller.add);
router.delete('/', controller.delete);

module.exports = router;