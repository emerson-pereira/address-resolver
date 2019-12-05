const express = require('express');
const resolveAddress = require('../services/resolve-address');
const router = express.Router();

router.post('/', (req, res) => {
  const { zipCode } = req.body;

  if (!zipCode) {
    res.json({
      error: true,
      message: 'failed, no zipcode'
    });
  }

  resolveAddress(zipCode)
    .then(address => {
      res.json(address);
    })
    .catch(err => {
      if (err.error) {
        res.status(err.status || 502).json({
          error: true,
          message: err.message
        });
      } else {
        res.status(500).json({
          error: true,
          message: 'Erro inesperado no servidor'
        });
      }
    });
});

module.exports = router;
