import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../../api/orderData';
import ViewOrder from '../../components/ViewOrder';

export default function ViewOrders() {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    getAllOrders().then((data) => setAllOrders(data));
  }, []);

  return (
    <div>
      <ViewOrder orders={allOrders} />
    </div>
  );
}
