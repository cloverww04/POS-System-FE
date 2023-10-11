import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { getAllOrders } from '../../api/orderData';
import Orders from '../../components/Orders';

export default function ViewOrders() {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    getAllOrders().then((data) => setAllOrders(data));
  }, []);

  return (
    <div>
      <Head>
        <title>Orders</title>
      </Head>
      <div className="d-flex justify-content-between">
        <h1 className="py-3" style={{ color: 'white' }}>All Orders</h1>
      </div>

      <Orders orders={allOrders} />
    </div>
  );
}
