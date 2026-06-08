import { useState, type FormEvent } from 'react';
import { checkPassword } from '../auth/access';

interface PasswordGateProps {
  onSuccess: () => void;
}

export function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (checkPassword(password)) {
      setError('');
      onSuccess();
      return;
    }

    setError('Incorrect password. Please try again.');
    setPassword('');
  };

  return (
    <div className="password-gate">
      <div className="password-gate__card">
        <h1 className="password-gate__title">DEPS SaaS Price Calculator</h1>
        <p className="password-gate__text">Enter the password to continue.</p>
        <form className="password-gate__form" onSubmit={handleSubmit}>
          <label className="password-gate__label" htmlFor="access-password">
            Password
          </label>
          <input
            id="access-password"
            className="password-gate__input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) {
                setError('');
              }
            }}
            autoComplete="current-password"
            autoFocus
          />
          {error && <p className="password-gate__error">{error}</p>}
          <button className="password-gate__button" type="submit">
            Open calculator
          </button>
        </form>
      </div>
    </div>
  );
}
