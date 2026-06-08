export const ACCESS_PASSWORD = 'Alistair123';

export const AUTH_STORAGE_KEY = 'ssomil-authenticated';

export function isPasswordGateEnabled(): boolean {
  return !import.meta.env.DEV;
}

export function isAuthenticated(): boolean {
  if (!isPasswordGateEnabled()) {
    return true;
  }

  return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

export function setAuthenticated(): void {
  sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
}

export function checkPassword(value: string): boolean {
  return value === ACCESS_PASSWORD;
}
