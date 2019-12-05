import React, { useState } from 'react';
import AddressSummary from '../AddressSummary';
import InputMask from 'react-input-mask';

import './AddressForm.scss';

const AddressForm = () => {
  const [zipCode, updateZipCode] = useState('');

  const [address, updateAddress] = useState({
    cep: '',
    estado: '',
    cidade: '',
    logradouro: ''
  });

  const fetchAddress = e => {
    e.preventDefault();

    if (!zipCode) {
      return;
    }

    const url = 'http://localhost:4000/address';
    const options = {
      method: 'POST',
      body: JSON.stringify({ zipCode }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(url, options)
      .then(blob => blob.json())
      .then(res => {
        if (res && res.cep) {
          const { cep, estado, cidade, logradouro } = res;

          updateAddress({
            cep,
            estado,
            cidade,
            logradouro
          });
        } else {
          alert('ops :/');
        }
      });
  };

  return (
    <>
      <form className="address-form">
        <InputMask
          className="address-form-input address-form-input__text"
          type="text"
          margin="none"
          variant="filled"
          value={zipCode}
          onChange={e => updateZipCode(e.target.value)}
          mask="99999-999"
        ></InputMask>
        <button
          className="address-form-button address-form-input--submit"
          onClick={fetchAddress}
        >
          Buscar CEP
        </button>
      </form>
      {!!address.cep.length && <AddressSummary address={address} />}
    </>
  );
};

export default AddressForm;
