import { useState, useEffect } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { addItemToOrder, getAllItems } from '../api/menuData';

const SelectMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    getAllItems().then((items) => {
      setMenuItems(items);
    });
  }, []);

  const handleAddMenuItem = (itemId) => {
    if (window.confirm('Add item to order?')) {
      addItemToOrder(orderId, itemId).then(() => {
        router.push(`/orders/${orderId}`);
      });
    }
  };

  return (
    <Card className="max-width-card">
      <Card.Body>
        <h1>Select Menu Items to Add</h1>
        <ListGroup>
          {menuItems.map((menuItem) => (
            <Card key={menuItem.id}>
              <ListGroup.Item>
                <h4>{menuItem.name}</h4>
                <p>Price: {menuItem.price}</p>
                <Button
                  variant="success"
                  onClick={() => handleAddMenuItem(menuItem.id)}
                >
                  Add to Order
                </Button>
              </ListGroup.Item>
            </Card>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default SelectMenuItems;
