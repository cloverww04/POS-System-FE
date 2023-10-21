import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, ListGroup } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import Link from 'next/link';
import { getSingleOrder } from '../api/orderData';
import { deleteItem } from '../api/menuData';

const ViewOrder = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);

  const deleteMyItem = (orderId, menuItemId) => {
    if (window.confirm('Delete This Item?')) {
      deleteItem(orderId, menuItemId).then(() => {
        router.push(`/orders/${orderData.id}`);
      });
    }
  };

  useEffect(() => {
    const { id } = router.query;

    if (id) {
      getSingleOrder(id)
        .then((data) => setOrderData(data))
        .catch((error) => {
          console.error('Error fetching order:', error);
        });
    }
  }, [router.query]);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="max-width-card">
      <Card.Body>
        <h1>Order Name: {orderData.orderName}</h1>
        <h6>Order Status: {orderData.orderStatus}</h6>
        <h6>Phone Number: {orderData.phoneNumber}</h6>
        <h6>Email: {orderData.emailAddress}</h6>
        <h6>Order Type: {orderData.orderType}</h6>

        <h3>Menu Items</h3>
        <ListGroup>
          {orderData.menuItems.map((menuItem) => (
            <Card key={menuItem.itemName}>
              <ListGroup.Item>
                <h4>{menuItem.itemName}</h4>
                <p>Price: ${menuItem.price}</p>
                <p>Quantity: {menuItem.quantity}</p>
                {menuItem.comment !== null && (
                <p>Comment: {menuItem.comment}</p>
                )}
                <Link passHref href={`/items/?orderId=${orderData.id}&menuItemId=${menuItem.id}`}>
                  <Button variant="info" style={{ marginRight: '10px' }}>Edit Item</Button>
                </Link>
                <Button
                  variant="danger"
                  style={{ marginRight: '10px' }}
                  onClick={() => deleteMyItem(orderData.id, menuItem.id)}
                >
                  Delete Item
                </Button>
              </ListGroup.Item>
            </Card>
          ))}
        </ListGroup>

        <h3>Total Amount: {orderData.totalOrderAmount}</h3>
        <h4>Tip Amount: {orderData.tip}</h4>
        <h4>Review: {orderData.review || 'Not Reviewed'}</h4>
        <div className="d-flex justify-content-center mt-3">
          <Button
            variant="success"
            style={{ marginRight: '10px' }}
            onClick={() => router.push(`/selectMenuItems?orderId=${orderData.id}`)}
          >
            Add Item
          </Button>
          <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => router.push(`/paymentPage?orderId=${orderData.id}`)}>
            Go To Payment
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ViewOrder;
