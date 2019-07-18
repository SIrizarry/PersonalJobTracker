const log = require('electron-log');
log.transports.console.level = 'info';
log.transports.file.level = 'info';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    log.info('Sending 200....');
    res.send("200", "Success");
});

module.exports = router;
