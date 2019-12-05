import React from 'react';

import './AddressSummary.scss';

const AddressSummary = ({ address }) => {
  const labels = {
    cep: 'CEP',
    estado: 'Estado',
    cidade: 'Cidade',
    logradouro: 'Lograd.'
  };

  return (
    <section className="address-summary">
      <ul className="address-summary-list">
        {Object.entries(address).map(([key, value]) => (
          <li className="address-summary-list-item" key={`item-${key}`}>
            <p>
              <b>{labels[key]}:</b> {value}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AddressSummary;
