'use client';

import SubmitButton from '../submitButton/SubmitButton';

export default function ParentForm({ children }) {
  return (
    <form>
      {children}
      <SubmitButton />
    </form>
  );
}
