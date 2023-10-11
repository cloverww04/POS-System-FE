import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, ListGroup } from 'react-bootstrap';
// import PropTypes from 'prop-types';
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
        <h1>Total Amount: {orderData.totalOrderAmount}</h1>

        <h3>Menu Items</h3>
        <ListGroup>
          {orderData.menuItems.map((menuItem) => (
            <Card key={menuItem.itemName}>
              <ListGroup.Item>
                <h4>{menuItem.itemName}</h4>
                <p>Price: {menuItem.price}</p>
                <p>Quantity: {menuItem.quantity}</p>
                <Button variant="info" style={{ marginRight: '10px' }}>Edit Item</Button>
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
        <div className="d-flex justify-content-center mt-3">
          <Button
            variant="success"
            style={{ marginRight: '10px' }}
            onClick={() => router.push(`/selectMenuItems?orderId=${orderData.id}`)}
          >
            Add Item
          </Button>
          <Button variant="primary" style={{ marginRight: '10px' }}>
            Go To Payment
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ViewOrder;
