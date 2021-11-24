import React from 'react';
import { arrayOf, func } from 'prop-types';
import { connect } from 'react-redux';
import { actionDeleteItem } from '../actions';

class Table extends React.Component {
  findName(obj) {
    return Object.values(obj.exchangeRates)
      .filter((rates) => rates.code === obj.currency);
  }

  render() {
    const { expenses, deleteItem } = this.props;
    return (
      <table>
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
            <td>{this.findName(curr)[0].name}</td>
            <td>{Math.round(parseFloat(this.findName(curr)[0].ask) * 100) / 100}</td>
            <td>
              {
                Math.round((parseFloat(curr.value)
                * parseFloat(this.findName(curr)[0].ask)) * 100) / 100
              }
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => deleteItem(curr.id) }
              >
                Excluir
              </button>
            </td>
          </tr>))}
      </table>
    );
  }
}

Table.propTypes = {
  expenses: arrayOf().isRequired,
  deleteItem: func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(actionDeleteItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
