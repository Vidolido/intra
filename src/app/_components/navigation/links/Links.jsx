import NavLink from './navLink/NavLink';

const links = [
  {
    title: 'Top View',
    path: '/',
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    title: 'Login',
    path: '/login',
  },
];

const Links = () => {
  return (
    <nav className='flex gap-2'>
      {links.map((link, i) => (
        <NavLink key={i} link={link} />
      ))}
    </nav>
  );
};

export default Links;
