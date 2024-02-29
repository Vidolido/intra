'use client';
import { useParams } from 'next/navigation';

const Derivative = () => {
  const params = useParams();
  console.log(params);
  return <div>Derivative</div>;
};

export default Derivative;
