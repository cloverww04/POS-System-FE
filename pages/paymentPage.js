import React from 'react';
import { useRouter } from 'next/router';
import PaymentForm from '../components/PaymentForm';

function PaymentPage() {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <div>
      <PaymentForm orderId={orderId} />
    </div>
  );
}

export default PaymentPage;
