import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import Table from '../components/Table';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="site-wrapper">
        <Header />
        <Form />
        <Table />
      </div>
    );
  }
}

export default Wallet;
