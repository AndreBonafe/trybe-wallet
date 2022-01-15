import PropTypes from 'prop-types';
import React from 'react';

const optionsTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const optionsPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

export default function Selects({ isEditing, EditValue, handleChange,
  editingValue, exchangeRates, values }) {
  return (
    <>
      <label htmlFor="currency">
        Moeda
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ isEditing ? ({ target }) => EditValue({
            ...editingValue,
            currency: target.value }) : handleChange }
          id="currency"
          value={ isEditing ? editingValue.currency : values.currency }
        >
          {Object.keys(exchangeRates).filter((curr) => curr !== 'USDT')
            .map((coin) => (<option key={ coin }>{coin}</option>))}
        </select>
      </label>
      <label htmlFor="method" className="select-method">
        Método de Pagamento:
        <select
          data-testid="method-input"
          name="method"
          onChange={ isEditing ? ({ target }) => EditValue({
            ...editingValue,
            method: target.value }) : handleChange }
          value={ isEditing ? editingValue.method : values.method }
          id="method"
        >
          {optionsPayment.map((curr) => (<option key={ curr }>{curr}</option>))}
        </select>
      </label>
      <label htmlFor="tag">
        Tag:
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ isEditing ? ({ target }) => EditValue({
            ...editingValue,
            tag: target.value }) : handleChange }
          value={ isEditing ? editingValue.tag : values.tag }
          id="tag"
        >
          {optionsTag.map((tag) => (<option key={ tag }>{tag}</option>))}
        </select>
      </label>
    </>
  );
}

Selects.propTypes = {
  EditValue: PropTypes.func,
  editingValue: PropTypes.shape({}),
  exchangeRates: PropTypes.func,
  handleChange: PropTypes.any,
  isEditing: PropTypes.any,
}.isRequired;
