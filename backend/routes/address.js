var express = require("express");
var fetch = require("node-fetch");
var router = express.Router();

router.post("/", function(req, res, next) {
  const { zipCode } = req.body;

  if (!zipCode) {
    res.json({
      error: true,
      message: "failed, no zipcode"
    });
  }

  fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
    .then(blob => blob.json())
    .then(data => {
      if (data && data.cep) {
        console.log("data", data);
        const { cep, uf: estado, localidade: cidade, logradouro } = data;

        res.json({
          cep,
          estado,
          cidade,
          logradouro
        });
      } else {
        res.json({
          error: true,
          message: "failed, :/"
        });
      }
    });
});

module.exports = router;
