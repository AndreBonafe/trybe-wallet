import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { actionChangeEditing, actionGetEditingValue } from '../actions';

class ButtonsTable extends Component {
  constructor(props) {
    super(props);

    this.enterEditingMode = this.enterEditingMode.bind(this);
  }

  enterEditingMode({ target }) {
    const { changeEditing, getEditingValue } = this.props;
    changeEditing(true);
    getEditingValue(target.id);
  }

  render() {
    const { deleteItem, id, isEditing } = this.props;
    return (
      <td className="buttons">
        <button
          type="button"
          data-testid="edit-btn"
          id={ id }
          onClick={ this.enterEditingMode }
        >
          <AiFillEdit />
        </button>
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => deleteItem(id) }
          disabled={ isEditing }
        >
          <FaTrashAlt />
        </button>
      </td>
    );
  }
}

ButtonsTable.propTypes = {
  changeEditing: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  getEditingValue: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isEditing: state.wallet.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  changeEditing: (bool) => dispatch(actionChangeEditing(bool)),
  getEditingValue: (i) => dispatch(actionGetEditingValue(i)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsTable);
