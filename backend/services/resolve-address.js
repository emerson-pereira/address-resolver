const fetch = require('node-fetch');

const resolveAddress = zipCode => {
  return new Promise((resolve, reject) => {
    !zipCode && reject('No zip code provided');

    const url = `https://viacep.com.br/ws/${zipCode}/json/`;

    fetch(url)
      .then(blob => blob.json())
      .then(data => {
        if (data && data.erro) {
          reject({
            error: true,
            message: 'CEP inexistente',
            status: 406
          });
        }
        if (data && data.cep) {
          const { cep, logradouro, localidade, uf } = data;

          resolve({
            cep,
            logradouro,
            localidade,
            uf
          });
        } else {
          reject({
            error: true,
            message: 'Erro ao buscar CEP'
          });
        }
      })
      .catch(err => {
        // Push error to log service
        reject({ error: true, message: 'Erro ao buscar CEP' });
      });
  });
};

module.exports = resolveAddress;
