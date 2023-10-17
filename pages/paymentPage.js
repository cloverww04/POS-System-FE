import React from 'react';
import { useRouter } from 'next/router';
import PaymentForm from '../components/PaymentForm';

function PaymentPage() {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <div>
      <PaymentForm orderId={parseInt(orderId, 10)} />
    </div>
  );
}

export default PaymentPage;
