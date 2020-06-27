import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import NProgress from 'nprogress';

import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';

import AddressSummary from '../AddressSummary';
import './AddressForm.scss';

const GET_ADDRESS = gql`
  query Address($zip: String!) {
    address(zip: $zip) {
      cep
      uf
      localidade
      logradouro
    }
  }
`;

const AddressForm = () => {
  const [zipCode, setZipCode] = useState('');

  const [getAddress, { loading, data }] = useLazyQuery(GET_ADDRESS);

  loading && NProgress.start();
  !loading && NProgress.done();

  const address = {
    cep: '',
    estado: '',
    cidade: '',
    logradouro: '',
  };

  if (data && data.address) {
    address.cep = data.address.cep;
    address.estado = data.address.uf;
    address.cidade = data.address.localidade;
    address.logradouro = data.address.logradouro;
  }

  const formatZipCode = (zipCode) => {
    return zipCode.replace('-', '');
  };

  const isZipCodeValid = (zipCode) => {
    const validateZipCode = /^[0-9]{8}$/;
    return validateZipCode.test(zipCode);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    const zipCodeFormatted = formatZipCode(zipCode);

    if (!zipCode) {
      alert('Ops, acho que você esqueceu de preencher o CEP 👀');
      return;
    }

    if (!isZipCodeValid(zipCodeFormatted)) {
      alert('Olha, eu não reconheci esse formato de CEP 😐');
      return;
    }

    getAddress({
      variables: {
        zip: zipCode,
      },
    });
  };

  return (
    <>
      <form className="address-form">
        <InputMask
          className="address-form-input"
          type="text"
          value={zipCode}
          placeholder="CEP"
          onChange={(e) => setZipCode(e.target.value)}
          mask="99999-999"
        />
        <button className="address-form-button" onClick={handleButtonClick}>
          Buscar CEP
        </button>
      </form>
      {address.cep && <AddressSummary address={address} />}
    </>
  );
};

export default AddressForm;
