import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OrderForm from '../../../components/OrderForm';
import { getSingleOrder } from '../../../api/orderData';

export default function EditOrder() {
  const [editOrder, setEditOrder] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setEditOrder);
  }, [id]);

  return (
    <div>
      <h1 className="py-3" style={{ color: 'white' }}>Update Order</h1>
      <OrderForm obj={editOrder} />
    </div>
  );
}
