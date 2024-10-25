import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveAttribute(attr: string, value?: string): R;
      toBeInTheDocument(): R;
      toHaveTextContent(text: string): R;
      // Add other custom matchers you might need
    }
  }
}

export {};
