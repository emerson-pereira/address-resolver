import React from 'react';

import './AddressSummary.scss';

const AddressSummary = ({ address }) => {
  return (
    <section className="address-summary">
      <ul>
        {Object.entries(address).map(([key, value]) => (
          <li key={`item-${key}`}>
            <p>
              <b>{key.toUpperCase()}</b> {value}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AddressSummary;
