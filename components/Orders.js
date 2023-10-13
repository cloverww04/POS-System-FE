/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deleteOrder } from '../api/orderData';

const Orders = ({ orders }) => {
  const deleteMyOrder = (id) => {
    if (window.confirm('Delete This Post?')) {
      deleteOrder(id).then(() => window.location.reload());
    }
  };

  return (
    <div className="row">
      {orders.map((order) => (
        <div key={order.id} className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Name: {order.orderName}</h5>
              <p className="card-text">Status: {order.orderStatus}</p>
              <p className="card-text">Phone Number: {order.phoneNumber}</p>
              <p className="card-text">Email Address: {order.emailAddress}</p>
              <p className="card-text">Order Type: {order.orderType}</p>

              <div className="d-flex justify-content-between">
                <Link passHref href={`/orders/${order.id}`}>
                  <Button variant="info" className="mt-3 btn-sm" style={{ height: '32px' }}>
                    View
                  </Button>
                </Link>
                <Link passHref href={`/orders/edit/${order.id}`}>
                  <Button variant="primary" className="mt-3 btn-sm" style={{ height: '32px', backgroundColor: 'purple', borderColor: 'purple' }}>
                    Edit
                  </Button>
                </Link>
                <Button variant="danger" className="mt-3 btn-sm" style={{ height: '32px' }} onClick={() => deleteMyOrder(order.id)}>
                  Delete
                </Button>

              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
const postShape = PropTypes.shape({
  Id: PropTypes.number,
  OrderName: PropTypes.string,
  OrderStatus: PropTypes.string,
  PhoneNumber: PropTypes.string,
  EmailAddress: PropTypes.string,
  OrderType: PropTypes.string,
});

Orders.propTypes = {
  orders: PropTypes.arrayOf(postShape).isRequired,
};

export default Orders;
