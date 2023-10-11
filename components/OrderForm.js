import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createOrder, updateOrder } from '../api/orderData';
import { useAuth } from '../utils/context/authContext';
import { getAllTypes, addTypeToOrder } from '../api/orderTypeData';
import { checkUser } from '../utils/auth';

const initialState = {
  // Id: 0,
  CustomerFirstName: '',
  CustomerLastName: '',
  CustomerEmail: '',
  CustomerPhone: '',
};

export default function OrderForm({ obj }) {
  const [formData, setFormData] = useState(initialState);
  const [, setUser] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const [type, setType] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState('');

  useEffect(() => {
    getAllTypes()
      .then((data) => {
        setType(data);
      })
      .catch((error) => {
        console.error('Error fetching types:', error);
      });
    checkUser(user.id).then(setUser);

    if (obj.Id) {
      setFormData(obj);
    }
  }, [user.id, obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.Id && selectedTypeId) {
      const payload = { ...formData, Id: obj.Id };
      updateOrder(payload)
        .then(() => router.push('../viewOrders'));
    } else {
      const payload = {
        ...formData,
        OrderPlaced: new Date(),
        EmployeeId: user.id,
        RevenueId: user.id,
        Id: obj.Id,
      };
      createOrder(payload)
        .then((response) => {
          const createdOrderId = response.id;
          return addTypeToOrder(createdOrderId, selectedTypeId);
        })
        .then((response) => {
          router.push(`/selectMenuItems?orderId=${response.id}`);
        })
        .catch((error) => {
          console.error('API Error:', error);
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        {/* IMAGE INPUT AS STRING */}
        <FloatingLabel controlId="floatingInput1" label="Enter first name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="CustomerFirstName"
            value={formData.CustomerFirstName}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Enter last name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="CustomerLastName"
            value={formData.CustomerLastName}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Enter email" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter customer email"
            name="CustomerEmail"
            value={formData.CustomerEmail}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Enter customer phone number" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter the customer phone number"
            name="CustomerPhone"
            value={formData.CustomerPhone}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Form.Group className="mb-3" controlId="formGridLevel">
          <Form.Select
            aria-label="OrderType"
            name="typeId"
            onChange={(e) => {
              handleChange(e);
              setSelectedTypeId(e.target.value); // Update selectedTypeId
            }}
            className="mb-3"
            value={selectedTypeId}
          >
            <option value="">Select an order type</option>
            {type.map((types) => (
              <option key={types.id} value={types.id}>
                {types.type}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* SUBMIT BUTTON  */}

        <Button type="submit" className="btn-secondary mt-2">{obj.Id ? 'Update' : 'Create'} Order</Button>
      </Form>
    </>
  );
}

OrderForm.propTypes = {
  obj: PropTypes.shape({
    Id: PropTypes.number,
    CustomerFirstName: PropTypes.string,
    CustomerLastName: PropTypes.string,
    CustomerPhone: PropTypes.string,
    CustomerEmail: PropTypes.string,
    EmployeeId: PropTypes.number,
    RevenueId: PropTypes.number,
    OrderType: PropTypes.string,
  }),
};
OrderForm.defaultProps = {
  obj: initialState,
};
