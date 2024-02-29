import Link from 'next/link';

const derivativeLinks = [
  {
    title: 'UNL-95',
    path: 'unl-95',
  },
  {
    title: 'UNL-98',
    path: 'unl-98',
  },
  {
    title: 'ULSD',
    path: 'ulsd',
  },
  {
    title: 'GM-1',
    path: 'gm-1',
  },
  {
    title: 'Heating Gas Oil',
    path: 'heating-gas-oil',
  },
  {
    title: 'Fuel Oul',
    path: 'fuel-oil',
  },
];

const DerivativeLinks = () => {
  return (
    <nav>
      {derivativeLinks.map((dLink) => (
        <Link key={dLink.title} href={`/dashboard/${dLink.path}`}>
          {dLink.title}
        </Link>
      ))}
    </nav>
  );
};

export default DerivativeLinks;
