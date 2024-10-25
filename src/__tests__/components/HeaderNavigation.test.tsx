// src/_tests_/components/HeaderNavigation.test.tsx
import HeaderNavigation from '@/components/navigation/HederNavigation';
import { render, screen } from '@testing-library/react';
// import HeaderNavigation from '@/components/HeaderNavigation'

// Mock the Links component since we want to test HeaderNavigation in isolation
jest.mock('@/components/Links', () => {
  return {
    __esModule: true,
    default: ({ link }: { link: { label: { en: string }; path: string } }) => (
      <a href={link.path}>{link.label.en}</a>
    ),
  };
});

// Mock next/image since it's not available in test environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe('HeaderNavigation', () => {
  beforeEach(() => {
    render(<HeaderNavigation />);
  });

  describe('Logo', () => {
    it('should render the company logo', () => {
      const logo = screen.getByAltText('The company symbol');

      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/files/logo.png');
      expect(logo).toHaveAttribute('width', '200');
      expect(logo).toHaveAttribute('height', '60');
    });
  });

  describe('Navigation Links', () => {
    it('should render all navigation links', () => {
      expect(screen.getByText('Overview')).toBeInTheDocument();
      expect(screen.getByText('Car Pool')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('should have correct href attributes', () => {
      expect(screen.getByText('Overview').closest('a')).toHaveAttribute(
        'href',
        '/'
      );
      expect(screen.getByText('Car Pool').closest('a')).toHaveAttribute(
        'href',
        '/car-pool'
      );
      expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute(
        'href',
        '/dashboard'
      );
      expect(screen.getByText('Login').closest('a')).toHaveAttribute(
        'href',
        '/login'
      );
    });
  });

  describe('Layout', () => {
    it('should render within a header tag', () => {
      expect(screen.getByRole('banner')).toBeInTheDocument(); // header tag has banner role
    });

    it('should contain a navigation element', () => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });
});
