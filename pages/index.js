import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from '../utils/context/authContext';
import foodImage from '../images/food.png';

function Home() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Image src={foodImage} alt="Food" width={300} height={200} />
      <h1 style={{ color: 'white' }}>Welcome, {user.fbUser.displayName}! </h1>

      <Button style={{ marginTop: '10px' }} variant="success" type="button" size="lg" className="copy-btn" onClick={() => router.push('/orders/viewOrders')}>
        View Orders
      </Button>
      <Button style={{ marginTop: '10px' }} variant="info" type="button" size="lg" className="copy-btn" onClick={() => router.push('/createOrder')}>
        Create an Order
      </Button>
      <Button style={{ marginTop: '10px' }} variant="warning" type="button" size="lg" className="copy-btn" onClick={() => router.push('/revenuePage')}>
        View Revenue
      </Button>

    </div>
  );
}

export default Home;
