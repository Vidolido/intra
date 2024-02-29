import Link from 'next/link';

const NavLink = ({ link }) => {
  return <Link href={link.path}>{link.title}</Link>;
};

export default NavLink;
