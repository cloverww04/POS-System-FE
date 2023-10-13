import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createOrder, updateOrder } from '../api/orderData';
import { useAuth } from '../utils/context/authContext';
import { getAllTypes, addTypeToOrder, updateTypeToOrder } from '../api/orderTypeData';
import { checkUser } from '../utils/auth';

const initialState = {
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

  const selectedOrder = obj;

  useEffect(() => {
    getAllTypes()
      .then((data) => {
        setType(data);
      })
      .catch((error) => {
        console.error('Error fetching types:', error);
      });
    checkUser(user.id).then(setUser);

    if (obj.id) {
      const fullName = selectedOrder.orderName.split(' ');
      const updatedFormData = {

        CustomerFirstName: fullName[0],
        CustomerLastName: fullName.slice(1).join(' '),
        CustomerEmail: selectedOrder.emailAddress,
        CustomerPhone: selectedOrder.phoneNumber,
      };
      setFormData(updatedFormData);
    }
  }, [user.id, obj, selectedOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id && selectedTypeId) {
      const payload = {
        ...formData, Id: obj.id, OrderPlaced: new Date(), OrderType: selectedTypeId,
      };
      updateOrder(payload)
        .then((response) => updateTypeToOrder(response.id, selectedTypeId))
        .then(() => {
          router.push('../viewOrders');
        })
        .catch((error) => {
          console.error('API Error:', error);
        });
    } else {
      const payload = {
        ...formData,
        OrderPlaced: new Date(),
        EmployeeId: user.id,
        RevenueId: user.id,
        Id: obj.id,
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
            name="selectedTypeId"
            onChange={(e) => {
              handleChange(e);
              setSelectedTypeId(e.target.value);
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

        <Button type="submit" className="btn-secondary mt-2">{obj.id ? 'Update' : 'Create'} Order</Button>
      </Form>
    </>
  );
}

OrderForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
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
