const resolveAddress = require('../services/resolve-address');

const expected = {
  cep: '09960-430',
  uf: 'SP'
};

test('Resolves address from 09960-430', () => {
  resolveAddress('09960-430').then(res => {
    expect(res).toMatchObject(expected);
  });
});
