import { useState } from 'react';
import { isAuthenticated, setAuthenticated } from './auth/access';
import { CalculatorApp } from './CalculatorApp';
import { PasswordGate } from './components/PasswordGate';

export default function App() {
  const [authenticated, setAuthenticatedState] = useState(isAuthenticated);

  if (!authenticated) {
    return (
      <PasswordGate
        onSuccess={() => {
          setAuthenticated();
          setAuthenticatedState(true);
        }}
      />
    );
  }

  return <CalculatorApp />;
}
