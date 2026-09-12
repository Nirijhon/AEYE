import React from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import EmptyState from '../components/ui/States';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <EmptyState
          icon="alert"
          title="404 — page not found"
          sub="The page you're looking for doesn't exist or has moved. Let's get you back to a safe location."
          action={<Button to="/" variant="primary"><Icon name="home" size={16} /> Back to home</Button>}
        />
      </div>
    </section>
  );
}