import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import getEmpRevenue from '../api/revenueData';

const Revenue = ({ userId }) => {
  const [revenueData, setRevenueData] = useState(null);

  useEffect(() => {
    getEmpRevenue(userId)
      .then((data) => setRevenueData(data))
      .catch((error) => console.error('Error fetching revenue data:', error));
  }, [userId]);

  return (
    <div className="centered-card">
      {revenueData ? (
        <Card style={{ width: '48rem' }}>
          <Card.Body style={{ fontSize: '20px', padding: '20px' }}>
            <Card.Title>Revenue Information</Card.Title>
            <Card.Text>Total Tips: ${revenueData[0].tip}</Card.Text>
            <Card.Text>Total Order Amount with Tip: ${revenueData[0].totalOrderAmountWithTip}</Card.Text>
            <Card.Text>Date Range: {revenueData[0].orderCreated} --- {revenueData[0].orderClosed}</Card.Text>
            <Card.Text>Walk-In Count: {revenueData[0].walkInCount}</Card.Text>
            <Card.Text>Call-In Count: {revenueData[0].callInCount}</Card.Text>
            <Card.Text>Cash Count: {revenueData[0].cashCount}</Card.Text>
            <Card.Text>Credit Card Count: {revenueData[0].creditCardCount}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading revenue data...</p>
      )}
    </div>
  );
};

Revenue.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default Revenue;
