import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getPayments, addPayment } from '../api/paymentData';

const PaymentForm = ({ orderId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Tip: 0,
    PaymentType: '',
  });
  const [paymentTypes, setPaymentTypes] = useState([]);

  useEffect(() => {
    const fetchPaymentTypes = async () => {
      const payments = await getPayments();
      setPaymentTypes(payments);
    };

    fetchPaymentTypes();
  }, []);

  const handlePaymentTypeChange = (e) => {
    setFormData({
      ...formData,
      PaymentType: e.target.value,
    });
  };

  const handleTipChange = (e) => {
    setFormData({
      ...formData,
      Tip: parseFloat(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addPayment(orderId, formData.PaymentType, formData.Tip)
      .then(() => {
        router.push(`/orders/${orderId}`);
      })
      .catch((error) => {
        console.error('Error adding payment:', error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: 'white' }}>Select Payment Type</Form.Label>
        <Form.Control as="select" name="PaymentType" value={formData.PaymentType} onChange={handlePaymentTypeChange}>
          <option value="">Select Payment Type</option>

          {paymentTypes.map((paymentType) => (
            <option key={paymentType.id} value={paymentType.type}>
              {paymentType.type}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{ color: 'white' }}>Tip Amount</Form.Label>
        <Form.Control type="number" name="Tip" value={formData.Tip} onChange={handleTipChange} />
      </Form.Group>

      <Button type="submit" variant="secondary">
        Confirm Payment
      </Button>
    </Form>
  );
};

PaymentForm.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default PaymentForm;
