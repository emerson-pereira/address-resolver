const fetch = require('node-fetch');

const resolveAddress = zipCode => {
  return new Promise((resolve, reject) => {
    !zipCode && reject('No zip code provided');

    const url = `https://viacep.com.br/ws/${zipCode}/json/`;

    fetch(url)
      .then(blob => blob.json())
      .then(data => {
        if (data && data.cep) {
          const { cep, uf: estado, localidade: cidade, logradouro } = data;

          resolve({
            cep,
            estado,
            cidade,
            logradouro
          });
        } else {
          reject({
            error: true,
            message: 'Error resolving adress'
          });
        }
      })
      .catch(err => {
        reject({ error: true, message: err });
      });
  });
};

module.exports = resolveAddress;
