import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionDeleteItem } from '../actions';
import ButtonsTable from './ButtonsTable';

class Table extends React.Component {
  findName(obj) {
    return Object.values(obj.exchangeRates)
      .filter((rates) => rates.code === obj.currency);
  }

  render() {
    const { expenses, deleteItem, changeEditing } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {expenses.map((curr) => (
            <tr key={ curr.id }>
              <td>{curr.description}</td>
              <td>{curr.tag}</td>
              <td>{curr.method}</td>
              <td>{curr.value}</td>
              <td>{this.findName(curr)[0].name.split('/')[0]}</td>
              <td>{parseFloat(curr.exchangeRates[curr.currency].ask).toFixed(2)}</td>
              <td>
                {
                  Math.round((parseFloat(curr.value)
                  * parseFloat(this.findName(curr)[0].ask)) * 100) / 100
                }
              </td>
              <td>Real</td>
              <ButtonsTable
                deleteItem={ deleteItem }
                id={ curr.id }
                changeEditing={ changeEditing }
              />
            </tr>))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  changeEditing: PropTypes.func,
  deleteItem: PropTypes.func,
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  values: state.wallet.values,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(actionDeleteItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
