import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { updateCommentForOrderItem } from '../api/menuData';

const ItemForm = ({ orderId, menuItemId }) => {
  const [formData, setFormData] = useState({
    Comment: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderId) {
      updateCommentForOrderItem(orderId, menuItemId, formData.Comment)
        .then(() => {
          router.push(`/orders/${orderId}`);
        })
        .catch((error) => {
          console.error('Error updating comment:', error);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Leave a Comment</Form.Label>
        <Form.Control
          as="textarea"
          name="Comment"
          value={formData.Comment}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit" variant="secondary">
        Update Comment
      </Button>
    </Form>
  );
};

ItemForm.propTypes = {
  orderId: PropTypes.number.isRequired,
  menuItemId: PropTypes.number.isRequired,
};

export default ItemForm;
