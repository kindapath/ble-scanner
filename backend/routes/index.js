const { logDevices } = require('../controllers/devices');

const router = require('express').Router();

router.post('/', logDevices)

module.exports = router;
