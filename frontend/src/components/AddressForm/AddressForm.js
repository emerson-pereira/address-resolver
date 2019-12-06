import React, { useState } from 'react';
import AddressSummary from '../AddressSummary';
import InputMask from 'react-input-mask';
import NProgress from 'nprogress';

import './AddressForm.scss';

const AddressForm = () => {
  const [zipCode, updateZipCode] = useState('');

  const [address, updateAddress] = useState({
    cep: '',
    estado: '',
    cidade: '',
    logradouro: ''
  });

  const formatZipCode = zipCode => {
    return zipCode.replace('-', '');
  };

  const isZipCodeValid = zipCode => {
    const validateZipCode = /^[0-9]{8}$/;
    return validateZipCode.test(zipCode);
  };

  const fetchAddress = e => {
    e.preventDefault();

    if (!zipCode) {
      alert('Ops, acho que você esqueceu de preencher o CEP 👀');
      return;
    }

    const zipCodeFormatted = formatZipCode(zipCode);

    if (!isZipCodeValid(zipCodeFormatted)) {
      alert('Olha, eu não reconheci esse formato de CEP 😐');
      return;
    }

    NProgress.start();

    const url = 'http://localhost:4000/address';
    const options = {
      method: 'POST',
      body: JSON.stringify({ zipCode: zipCodeFormatted }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(url, options)
      .then(blob => blob.json())
      .then(res => {
        if (res && res.error) {
          alert(res.message);
          return;
        }

        if (res && res.cep) {
          const { cep, logradouro, localidade: cidade, uf: estado } = res;

          updateAddress({
            cep,
            logradouro,
            cidade,
            estado
          });
        } else {
          alert('Erro inesperado, favor tentar novamente');
        }
      })
      .then(() => {
        NProgress.done();
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
          onChange={e => updateZipCode(e.target.value)}
          mask="99999-999"
        />
        <button className="address-form-button" onClick={fetchAddress}>
          Buscar CEP
        </button>
      </form>
      {!!address.cep.length && <AddressSummary address={address} />}
    </>
  );
};

export default AddressForm;
