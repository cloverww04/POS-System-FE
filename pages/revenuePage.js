import React, { useEffect, useState } from 'react';
import Revenue from '../components/Revenue';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

const RevenuePage = () => {
  const [, setUserId] = useState();
  const { user } = useAuth();

  useEffect(() => {
    checkUser(user.id).then(setUserId);
  }, [user]);

  return (
    <div className="revenue-page" style={{ color: 'white' }}>
      <h1> Revenue Page</h1>
      <Revenue userId={user.id} />
    </div>
  );
};

export default RevenuePage;
