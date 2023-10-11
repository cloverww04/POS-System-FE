import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
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
        <h1 className="py-3">All Orders</h1>
        <Link passHref href="/createOrder">
          <Button variant="primary" className="mt-3 btn-sm" style={{ height: '32px' }}>
            Create Order
          </Button>
        </Link>
      </div>

      <Orders orders={allOrders} />
    </div>
  );
}
