import React from 'react';
import { useRouter } from 'next/router';
import ItemForm from '../components/ItemForm';

export default function EditOrder() {
  const router = useRouter();
  const { orderId, menuItemId } = router.query;

  return (
    <div>
      <ItemForm orderId={orderId} menuItemId={menuItemId} />
    </div>
  );
}
